output "user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "user_pool_client_id" {
  value = aws_cognito_user_pool_client.main.id
}

output "api_url" {
  value = "${aws_api_gateway_rest_api.main.execution_arn}/prod"
}

output "cloudfront_urls" {
  value = {
    for k, v in aws_cloudfront_distribution.apps : k => v.domain_name
  }
}

output "media_bucket_name" {
  value = aws_s3_bucket.media.bucket
}
