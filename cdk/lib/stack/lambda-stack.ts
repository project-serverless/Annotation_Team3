import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SYSTEM_NAME } from "../config/commons";
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
//npm install @aws-cdk/aws-lambda-python-alpha 로 다운 받으세요
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from "path";
import { ManagedPolicy, Role, ServicePrincipal, CompositePrincipal, PolicyDocument, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

export class PlannerLambdaStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        const lambdaRole = new Role(this, `${SYSTEM_NAME}-lambda-role`, {
            roleName: `planner-lambda-role`,
            assumedBy: new CompositePrincipal(
                new ServicePrincipal('lambda.amazonaws.com'),
            ),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonCognitoPowerUser')
            ]
        })

        // index.py -> lambda_handler

        new PythonFunction(this, `withdraw`, {
            functionName: `Planner-withdraw`,
            entry: path.join(__dirname, '../../../app/backend/withdraw'),
            index: 'withdraw.py',
            runtime: Runtime.PYTHON_3_10,
            role: lambdaRole,
            environment: {}
        })

        new PythonFunction(this, `userInfo`, {
            functionName: `Planner-userInfo`,
            entry: path.join(__dirname, '../../../app/backend/userInfo'),
            index: 'userInfo.py',
            runtime: Runtime.PYTHON_3_10,
            role: lambdaRole,
            environment: {}
        })
       
    }
}