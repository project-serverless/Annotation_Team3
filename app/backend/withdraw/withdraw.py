import boto3
import botocore.exceptions
import json

USER_POOL_ID = 'ap-northeast-2_5eW8pWTD5'
CLIENT_ID = '6mobo0geuib7g198ind93f8dsv'
REGION = 'ap-northeast-2'

def lambda_handler(event, context):
    
    username = event['username']

    client = boto3.client('cognito-idp', region_name=REGION)

    try:
        response = client.admin_delete_user(
            UserPoolId=USER_POOL_ID,
            Username = username
        )
        return {
            'statusCode': 200,
            'body': json.dumps('회원탈퇴 성공')
        }
    except botocore.exceptions.ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps('회원탈퇴 실패')
        }
