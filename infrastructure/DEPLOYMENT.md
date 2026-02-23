# Deployment Guide: Portfolio Platform

This document outlines the steps to deploy the Portfolio Platform to AWS using the automated CI/CD pipeline.

## 1. Prerequisites
- AWS Account with IAM permissions for S3, CloudFront, Cognito, API Gateway, and Lambda.
- GitHub Repository to host the code and triggers.
- Terraform installed (for infrastructure provisioning).

## 2. Infrastructure Provisioning
1. Navigate to `infrastructure/terraform`.
2. Initialize Terraform:
   ```bash
   terraform init
   ```
3. Plan and Apply:
   ```bash
   terraform apply
   ```
4. Note the outputs (User Pool ID, API Gateway URL, etc.).

## 3. GitHub Secrets Configuration
Configure the following secrets in your GitHub repository:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_GATEWAY_ID`
- `CLOUDFRONT_ENGINEERING_ID`
- `CLOUDFRONT_PHOTOGRAPHY_ID`
- `CLOUDFRONT_ADMIN_ID`

## 4. CI/CD Pipeline
- Pull requests merged into `main` will automatically trigger the `Deploy Portfolio Platform` workflow.
- This workflow builds all apps and synchronizes the artifacts to their respective S3 buckets.
- CloudFront caches are invalidated automatically to reflect changes.

## 5. Manual Verification
- Verify the Gateway app at the root domain.
- Verify subdomains (Engineering, Photography) are resolving correctly.
- Test Admin login via Cognito.
