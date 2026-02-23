resource "aws_s3_bucket" "apps" {
  for_each = toset(local.apps)
  bucket   = "${var.project_name}-${each.key}"
  tags     = local.common_tags
}

resource "aws_s3_bucket_public_access_block" "apps" {
  for_each = aws_s3_bucket.apps
  bucket   = each.value.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "content" {
  bucket = "${var.project_name}-content"
  tags   = local.common_tags
}

resource "aws_s3_bucket" "media" {
  bucket = "${var.project_name}-media"
  tags   = local.common_tags
}

resource "aws_s3_bucket_cors_configuration" "media" {
  bucket = aws_s3_bucket.media.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["https://${var.domain_name}", "https://*.${var.domain_name}", "http://localhost:5173"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}
