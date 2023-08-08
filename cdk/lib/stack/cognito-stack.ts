import { OAuthScope } from '@aws-cdk/aws-cognito';
import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class PlannerCognitoStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      // Cognito UserPool 생성
      const userPool = new cognito.UserPool(this, 'PlannerUserPool', {
        userPoolName:'PlannerUserPool',
        selfSignUpEnabled: true,
        signInAliases: { username: true },
        autoVerify:{
            email:true,
            phone:false
        },
        userVerification: {
          emailStyle: cognito.VerificationEmailStyle.LINK,
        },
        standardAttributes: {
            email: {
              required: true,
              mutable: true,
            }
        },
        passwordPolicy:{
            requireUppercase:false,
        },
        accountRecovery:cognito.AccountRecovery.EMAIL_ONLY,
        deletionProtection:true,
        removalPolicy:cdk.RemovalPolicy.DESTROY

      });

      const userPoolDomain = new cognito.UserPoolDomain(this, 'PlannerUserPoolDomain', {
        userPool : userPool,
        cognitoDomain: {
          domainPrefix: 'planner', // 사용자 정의 도메인 접두사
        },
      });

      const userPoolClient = new cognito.UserPoolClient(this, 'PlannerUserPoolClient', {
        userPool : userPool,
        userPoolClientName : 'PlannerUserPoolClient',
        generateSecret: true,
        authFlows : {
            userSrp : true
        },
        oAuth:{
            flows:{
                implicitCodeGrant : true,
                authorizationCodeGrant : false
            },
            scopes:[OAuthScope.EMAIL,OAuthScope.COGNITO_ADMIN,OAuthScope.OPENID,OAuthScope.PROFILE],
            callbackUrls:["https://localhost:3000"],

        }
      });


    }
  }