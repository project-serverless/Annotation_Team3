import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PlannerData')  # Make sure to update the table name

def lambda_handler(event, context):
    try:
        # Extract "event_id" from query string parameters
        event_id = event['queryStringParameters']['event_id']

        # Get the item with the specified "event_id" from the DynamoDB table
        response = table.get_item(Key={'ID': event_id})  # Assuming 'ID' is the primary key of your DynamoDB table

        if 'Item' in response:
            # Item found, return the item data as a response
            return {
                'statusCode': 200,
                'body': json.dumps(response['Item'])
            }
        else:
            # Item not found, return 404 Not Found status
            return {
                'statusCode': 404,
                'body': json.dumps('Event not found.')
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error reading event: ' + str(e))
        }