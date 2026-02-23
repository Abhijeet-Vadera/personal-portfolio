import json
import os
import boto3
import re
from botocore.exceptions import ClientError

s3 = boto3.client('s3')
CONTENT_BUCKET = os.environ['CONTENT_BUCKET']
MEDIA_BUCKET = os.environ['MEDIA_BUCKET']

# Simple regex to allow only alphanumeric, dashes, dots, and underscores
SAFE_PATH_REGEX = re.compile(r'^[a-zA-Z0-9\-_./]+$')

def is_safe_path(path):
    if not path or '..' in path or not SAFE_PATH_REGEX.match(path):
        return False
    return True

def get_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*', # Restricted in production API GW
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
        },
        'body': json.dumps(body) if isinstance(body, (dict, list)) else body
    }

def lambda_handler(event, context):
    print(f"Event: {json.dumps(event)}")
    
    http_method = event.get('httpMethod')
    path = event.get('path')
    
    try:
        if path == "/content":
            if http_method == "GET":
                key = event.get('queryStringParameters', {}).get('key', 'site-content.json')
                if not is_safe_path(key):
                    return get_response(400, {'error': 'Invalid key format'})
                
                try:
                    response = s3.get_object(Bucket=CONTENT_BUCKET, Key=key)
                    content = response['Body'].read().decode('utf-8')
                    return get_response(200, content)
                except s3.exceptions.NoSuchKey:
                    return get_response(404, {'error': 'Content not found'})
            
            elif http_method == "POST":
                body = json.loads(event.get('body', '{}'))
                key = body.get('key', 'site-content.json')
                data = body.get('data', {})
                
                if not is_safe_path(key):
                    return get_response(400, {'error': 'Invalid key format'})
                
                s3.put_object(Bucket=CONTENT_BUCKET, Key=key, Body=json.dumps(data))
                return get_response(200, {'message': 'Content updated successfully'})
        
        elif path == "/media/upload-url":
            if http_method == "GET":
                params = event.get('queryStringParameters', {})
                file_name = params.get('fileName')
                file_type = params.get('fileType', 'application/octet-stream')
                
                if not file_name or not is_safe_path(file_name):
                    return get_response(400, {'error': 'Invalid or missing fileName'})
                
                presigned_url = s3.generate_presigned_url(
                    'put_object',
                    Params={
                        'Bucket': MEDIA_BUCKET,
                        'Key': f"uploads/{file_name}",
                        'ContentType': file_type
                    },
                    ExpiresIn=3600
                )
                
                return get_response(200, {'uploadUrl': presigned_url, 'key': f"uploads/{file_name}"})

        elif path == "/media/list":
            if http_method == "GET":
                try:
                    # List objects with prefix 'uploads/'
                    response = s3.list_objects_v2(Bucket=MEDIA_BUCKET, Prefix='uploads/')
                    items = []
                    if 'Contents' in response:
                        for obj in response['Contents']:
                            if obj['Key'] != 'uploads/': # ignore the folder itself if it exists
                                items.append({
                                    'key': obj['Key'],
                                    'size': obj['Size'],
                                    'lastModified': obj['LastModified'].isoformat(),
                                    # Note: ContentType requires a separate HeadObject call
                                    # which is slow for lists. We'll default to 'image/*' in JS
                                    'contentType': 'image/*' 
                                })
                    # Sort by newest first
                    items.sort(key=lambda x: x['lastModified'], reverse=True)
                    return get_response(200, items)
                except Exception as e:
                    print(f"Error listing media: {str(e)}")
                    return get_response(500, {'error': 'Failed to list media objects'})
                    
        elif path == "/media":
            if http_method == "DELETE":
                key = event.get('queryStringParameters', {}).get('key')
                if not key or not is_safe_path(key) or not key.startswith('uploads/'):
                    return get_response(400, {'error': 'Invalid key for deletion'})
                    
                s3.delete_object(Bucket=MEDIA_BUCKET, Key=key)
                return get_response(200, {'message': 'Media deleted successfully'})

        return get_response(404, {'error': 'Not Found'})

    except ClientError as e:
        print(f"S3 Error: {str(e)}")
        return get_response(500, {'error': 'Storage operation failed'})
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return get_response(500, {'error': 'Internal Server Error'})
