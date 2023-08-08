import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {PlannerLambdaStack} from './stack/lambda-stack'
import {PlannerS3Stack} from './stack/s3-stack'
import {PlannerDynamoDBStack} from './stack/dynamodb-stack'
import {PlannerAPIgatewayStack} from './stack/apigateway-stack'
import {PlannerCognitoStack} from './stack/cognito-stack'
import { SYSTEM_NAME } from './config/commons';

// import * as sqs from 'aws-cdk-lib/aws-sqs';


export class PlannerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    new PlannerLambdaStack(this, `${SYSTEM_NAME}-lambdaStack`,props);
    new PlannerDynamoDBStack(this, `${SYSTEM_NAME}-dynamodbStack`,props);
    new PlannerS3Stack(this, `${SYSTEM_NAME}-s3Stack`,props);
    new PlannerAPIgatewayStack(this,`${SYSTEM_NAME}-APIgatewayStack`,props);
    new PlannerCognitoStack(this,`${SYSTEM_NAME}-cognitoStack`,props);
  }
}