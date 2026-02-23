locals {
  common_tags = {
    Project   = var.project_name
    ManagedBy = "Terraform"
  }
  
  apps = ["gateway", "engineering", "photography", "admin"]
}
