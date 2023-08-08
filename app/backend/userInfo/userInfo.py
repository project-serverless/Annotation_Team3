import boto3
import botocore.exceptions
import json

REGION = 'ap-northeast-2'

        
def lambda_handler(event, context):
    
    #헤더 추출
    header = event['header']['Authorization']
    
    
    #액세스 토큰 추출출
    access_token = header.split(' ')[1]
    client = boto3.client('cognito-idp', region_name=REGION)

    try:
        response = client.get_user(
            AccessToken=access_token
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }
        
    except botocore.exceptions.ClientError as e:
        error_code = e.response['Error']['Code']
        print(f"An error occurred: {error_code}")
        return {
            'statusCode': 500,
            'body': 'failed'
        }