import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PlannerData')  # Make sure to update the table name

def lambda_handler(event, context):
    try:
        # Extract "event_id" from query string parameters
        event_id = event['queryStringParameters']['event_id']

        # Delete the item with the specified "event_id"
        response = table.delete_item(Key = {'ID': event_id})  # Assuming 'ID' is the primary key of your DynamoDB table

        return {
            'statusCode': 200,
            'body': json.dumps('Event deleted successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error deleting event: ' + str(e))
        }