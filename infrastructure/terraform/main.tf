terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = "personal-account"
}

provider "aws" {
  alias   = "us-east-1"
  region  = "us-east-1"
  profile = "personal-account"
}
