import json
import boto3

REGION = 'ap-northeast-2'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PlannerData')

def lambda_handler(event, context):
    try:
        # Parse the incoming JSON data from the event body
        event_data = json.loads(event['body'])

        # Extract attribute values from user input
        item = {
            'ID': event_data.get('ID'),
            'Date': event_data.get('Date'),
            'Title': event_data.get('Title'),
            'EndDate': event_data.get('EndDate'),
            'Memo': event_data.get('Memo')
        }

        # Put the item into the DynamoDB table
        response = table.put_item(Item = item)

        return {
            'statusCode': 200,
            'body': json.dumps('Event created successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error creating event: ' + str(e))
        }