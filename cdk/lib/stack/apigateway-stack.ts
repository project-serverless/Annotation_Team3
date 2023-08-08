import { EndpointType } from '@aws-cdk/aws-apigateway';
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';


export class PlannerAPIgatewayStack extends cdk.Stack {
    
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const api = new apigateway.RestApi(this, 'Team3Planner', {
            cloudWatchRole: true,
            restApiName: 'Team3Planner',
            deploy: false,
            endpointTypes: [EndpointType.REGIONAL],
        });

        // Import existing Cognito User Pool
        const userPool = cognito.UserPool.fromUserPoolArn(this, 'PlannerUserPool', 'arn:aws:cognito-idp:ap-northeast-2:343102482966:userpool/ap-northeast-2_6TEGMI5ov');

        // Import existing Cognito User Pool Client
        const userPoolClient = cognito.UserPoolClient.fromUserPoolClientId(this, 'PlannerUserPoolClient', 'b6u1vg6re6dks25mqh37s96gq');

        const cognitoAuthorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
            cognitoUserPools: [userPool],
            authorizerName: 'CognitoAuthorizer',
        });


        const withdrawResource = api.root.addResource('withdraw');
        const withdrawARN = 'arn:aws:lambda:ap-northeast-2:343102482966:function:Planner-withdraw'
        const withdraw=lambda.Function.fromFunctionArn(this,'withdrawFunction',withdrawARN)
        withdrawResource.addMethod('DELETE', new apigateway.LambdaIntegration(withdraw),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        });

        const yearResource = api.root.addResource('{year}').addResource('{month}');
        /*년 숫자값 전달 람다함수 추가
        const tossARN = '함수 ARN'
        const toss=lambda.Function.fromFunctionArn(this,'tossFunction',tossARN)
        yearResource.addMethod('POST', new LambdaIntegration(toss)),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        }); 
        */

        //day resource
        const dayResource = yearResource.addResource('{day}');
        /*데이터 입력 람다함수 추가
        const createARN = '함수 ARN'
        const create=lambda.Function.fromFunctionArn(this,'createFunction',createARN)
        dayResource.addMethod('POST', new LambdaIntegration(create),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        }); 
        */

        //data index resource
        const indexResource = dayResource.addResource('{index}')
        /*내용 조회 람다함수 추가
        const readARN = '함수 ARN'
        const read=lambda.Function.fromFunctionArn(this,'readFunction',readARN)
        dayResource.addMethod('POST', new LambdaIntegration(read),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        }); 
        */

        /*내용 수정 람다함수 추가
        const updateARN = '함수 ARN'
        const update=lambda.Function.fromFunctionArn(this,'updateFunction',updateARN)
        dayResource.addMethod('PUT', new LambdaIntegration(update),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        }); 
        */

        /*내용 삭제 람다함수 추가
        const deleteARN = '함수 ARN'
        const delete=lambda.Function.fromFunctionArn(this,'deleteFunction',deleteARN)
        dayResource.addMethod('DELETE', new LambdaIntegration(delete),{
            authorizer: cognitoAuthorizer,
            authorizationType: apigateway.AuthorizationType.COGNITO,
        }); 
        */
    }
}

