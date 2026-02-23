# AWS Infrastructure Setup Guide

This guide outlines the steps required to provision the backend resources for your portfolio platform. All infrastructure code is located in `infrastructure/terraform/`.

## Prerequisites
1. **AWS Account**: Ensure you have an active AWS account.
2. **AWS CLI**: Installed and configured (`aws configure`).
3. **Terraform**: Installed on your local machine.

## Initial Provisioning

1.  **Navigate to Terraform Directory**:
    ```bash
    cd infrastructure/terraform
    ```

2.  **Initialize Terraform**:
    ```bash
    terraform init
    ```

3.  **Review and Apply**:
    ```bash
    terraform plan
    terraform apply
    ```
    > [!IMPORTANT]
    > Note the outputs displayed after completion: `api_endpoint`, `media_bucket_name`, `user_pool_id`, etc. You will need these for the next steps.

## Connecting the Frontend (Admin Panel)

1.  **Update AWS Exports**:
    Modify `apps/admin/src/aws-exports.js` with the values from the Terraform outputs.

2.  **Configure API URL**:
    Ensure the `fetch` calls in `MediaLibrary.tsx` point to your new `api_endpoint`.

## CI/CD Pipeline Setup

To enable automatic deployments, go to your GitHub Repository Settings > Secrets and variables > Actions, and add the following secrets:

- `AWS_ACCESS_KEY_ID`: Your AWS access key.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key.
- `AWS_REGION`: e.g., `us-east-1`
- `CLOUDFRONT_DISTRIBUTION_ID_GATEWAY`: From Terraform outputs.
- `CLOUDFRONT_DISTRIBUTION_ID_ENGINEERING`: From Terraform outputs.
- `CLOUDFRONT_DISTRIBUTION_ID_PHOTOGRAPHY`: From Terraform outputs.
- `CLOUDFRONT_DISTRIBUTION_ID_ADMIN`: From Terraform outputs.

## Current Hardening Status
- **Security**: Lambda has strict path validation; S3 blocks all public access; API Gateway is secured with Cognito.
- **Scalability**: Direct-to-S3 uploads via presigned URLs are implemented.
- **CI/CD**: The `deploy.yml` workflow is ready to sync your apps to the CloudFront CDN.

---

**Next Step**: Run `terraform apply` to begin!
