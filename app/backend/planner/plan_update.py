import json
import boto3

REGION = 'ap-northeast-2'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PlannerData')

def lambda_handler(event, context):
    try:
        event_id = event['queryStringParameters']['event_id']
        event_data = json.loads(event['body'])

        # Create the UpdateExpression and ExpressionAttributeValues for the attributes to be updated
        update_expression = 'SET '
        expression_attribute_values = {}

        if 'Date' in event_data:
            update_expression += '#date = :eventDate, '
            expression_attribute_values[':eventDate'] = event_data['Date']

        if 'Title' in event_data:
            update_expression += 'Title = :title, '
            expression_attribute_values[':title'] = event_data['Title']

        if 'EndDate' in event_data:
            update_expression += 'EndDate = :endDate, '
            expression_attribute_values[':endDate'] = event_data['EndDate']

        if 'Memo' in event_data:
            update_expression += 'Memo = :memo, '
            expression_attribute_values[':memo'] = event_data['Memo']

        # Remove the trailing comma from the UpdateExpression
        update_expression = update_expression.rstrip(', ')

        # Perform the update_item operation with the appropriate UpdateExpression and ExpressionAttributeValues
        response = table.update_item(
            Key = {'ID': event_id},
            UpdateExpression = update_expression,
            ExpressionAttributeValues = expression_attribute_values,
            ExpressionAttributeNames = {'#date': 'Date'},  # Since 'Date' is a reserved keyword, use an alias (#date)
            ReturnValues = 'UPDATED_NEW'
        )

        return {
            'statusCode': 200,
            'body': json.dumps('Event updated successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error updating event: ' + str(e))
        }