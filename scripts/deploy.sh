#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Local deployment script for abhijeet-portfolio-platform
# =============================================================================
# Usage:
#   ./scripts/deploy.sh [app]
#
#   app: all | gateway | engineering | photography | admin  (default: all)
#
# Examples:
#   ./scripts/deploy.sh          → deploy all apps
#   ./scripts/deploy.sh admin    → deploy only admin
#   ./scripts/deploy.sh gateway  → deploy only gateway
# =============================================================================

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
PROJECT_NAME="abhijeet-portfolio"
AWS_REGION="ap-south-1"
AWS_PROFILE="personal-account"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# All supported apps
ALL_APPS=("gateway" "engineering" "photography" "admin")

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ── Helpers ───────────────────────────────────────────────────────────────────
log()     { echo -e "${BLUE}[INFO]${NC}  $*"; }
success() { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*" >&2; }
section() { echo -e "\n${BOLD}${CYAN}▶ $*${NC}"; }

# ── Preflight checks ──────────────────────────────────────────────────────────
check_dependencies() {
  section "Checking dependencies"

  if ! command -v aws &>/dev/null; then
    error "AWS CLI not found. Install it: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html"
    exit 1
  fi
  success "AWS CLI found: $(aws --version 2>&1 | head -1)"

  if ! command -v pnpm &>/dev/null; then
    error "pnpm not found. Install it: npm install -g pnpm"
    exit 1
  fi
  success "pnpm found: $(pnpm --version)"

  # Verify AWS is authenticated using the specified profile
  if ! aws sts get-caller-identity --region "$AWS_REGION" --profile "$AWS_PROFILE" &>/dev/null; then
    error "AWS profile '$AWS_PROFILE' not configured or invalid."
    error "Run: aws configure --profile $AWS_PROFILE"
    exit 1
  fi
  local aws_account
  aws_account=$(aws sts get-caller-identity --query Account --output text --profile "$AWS_PROFILE")
  success "AWS authenticated — Profile: $AWS_PROFILE | Account: $aws_account | Region: $AWS_REGION"
}

# ── Get CloudFront distribution ID for a given app ───────────────────────────
get_cloudfront_id() {
  local app="$1"
  local bucket_name="${PROJECT_NAME}-${app}"

  # Find the CloudFront distribution that has this S3 bucket as its origin
  local dist_id
  dist_id=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Origins.Items[0].DomainName=='${bucket_name}.s3.amazonaws.com' || Origins.Items[0].DomainName=='${bucket_name}.s3.${AWS_REGION}.amazonaws.com'].Id | [0]" \
    --output text \
    --region "$AWS_REGION" \
    --profile "$AWS_PROFILE" 2>/dev/null)

  # Fallback: match by regional domain name pattern
  if [[ -z "$dist_id" || "$dist_id" == "None" ]]; then
    dist_id=$(aws cloudfront list-distributions \
      --query "DistributionList.Items[?contains(Origins.Items[0].DomainName,'${bucket_name}')].Id | [0]" \
      --output text \
      --region "$AWS_REGION" \
      --profile "$AWS_PROFILE" 2>/dev/null)
  fi

  echo "$dist_id"
}

# ── Build a single app ────────────────────────────────────────────────────────
build_app() {
  local app="$1"
  section "Building $app"

  cd "$REPO_ROOT"
  if pnpm --filter "$app" build; then
    success "$app built successfully → apps/$app/dist/"
  else
    error "Build failed for $app"
    exit 1
  fi
}

# ── Deploy a single app to S3 + CloudFront ────────────────────────────────────
deploy_app() {
  local app="$1"
  local bucket_name="${PROJECT_NAME}-${app}"
  local dist_dir="${REPO_ROOT}/apps/${app}/dist"

  section "Deploying $app → s3://$bucket_name"

  # Check dist folder exists
  if [[ ! -d "$dist_dir" ]]; then
    error "dist/ not found for $app at $dist_dir. Did the build succeed?"
    exit 1
  fi

  # Sync to S3
  log "Syncing files to S3..."
  if aws s3 sync "$dist_dir/" "s3://$bucket_name/" \
    --delete \
    --region "$AWS_REGION" \
    --profile "$AWS_PROFILE" \
    --cache-control "public,max-age=31536000,immutable" \
    --exclude "index.html"; then
    success "Static assets synced"
  else
    error "S3 sync failed for $app"
    exit 1
  fi

  # Upload index.html separately with no-cache so routing always gets fresh HTML
  log "Uploading index.html (no-cache)..."
  aws s3 cp "${dist_dir}/index.html" "s3://$bucket_name/index.html" \
    --region "$AWS_REGION" \
    --profile "$AWS_PROFILE" \
    --cache-control "no-cache,no-store,must-revalidate" \
    --content-type "text/html"
  success "index.html uploaded with no-cache headers"

  # CloudFront invalidation
  local cf_id
  cf_id=$(get_cloudfront_id "$app")

  if [[ -z "$cf_id" || "$cf_id" == "None" ]]; then
    warn "CloudFront distribution not found for $app. Skipping invalidation."
    warn "You may need to invalidate manually from the AWS Console."
  else
    log "Invalidating CloudFront cache (distribution: $cf_id)..."
    local invalidation_id
    invalidation_id=$(aws cloudfront create-invalidation \
      --distribution-id "$cf_id" \
      --paths "/*" \
      --query "Invalidation.Id" \
      --output text \
      --profile "$AWS_PROFILE")
    success "Cache invalidation triggered — ID: $invalidation_id"
    success "$app is live at: https://$(aws cloudfront get-distribution \
      --id "$cf_id" \
      --query "Distribution.DomainName" \
      --output text \
      --profile "$AWS_PROFILE")"
  fi
}

# ── Main ──────────────────────────────────────────────────────────────────────
main() {
  local target="${1:-all}"
  local apps_to_deploy=()

  echo -e "\n${BOLD}🚀 Portfolio Platform — Local Deploy${NC}"
  echo -e "Target: ${CYAN}${target}${NC} | Profile: ${CYAN}${AWS_PROFILE}${NC}\n"

  # Resolve which apps to deploy
  if [[ "$target" == "all" ]]; then
    apps_to_deploy=("${ALL_APPS[@]}")
  else
    # Validate the app name
    local valid=false
    for app in "${ALL_APPS[@]}"; do
      if [[ "$app" == "$target" ]]; then
        valid=true
        break
      fi
    done
    if [[ "$valid" == false ]]; then
      error "Unknown app: '$target'. Valid options: all, ${ALL_APPS[*]}"
      exit 1
    fi
    apps_to_deploy=("$target")
  fi

  check_dependencies

  # Build phase
  section "Building ${#apps_to_deploy[@]} app(s)"
  for app in "${apps_to_deploy[@]}"; do
    build_app "$app"
  done

  # Deploy phase
  section "Deploying ${#apps_to_deploy[@]} app(s)"
  for app in "${apps_to_deploy[@]}"; do
    deploy_app "$app"
  done

  # Summary
  echo -e "\n${GREEN}${BOLD}✅ Deployment complete!${NC}"
  echo -e "Apps deployed: ${CYAN}${apps_to_deploy[*]}${NC}\n"
}

main "$@"
