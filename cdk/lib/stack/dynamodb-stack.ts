import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Stack, StackProps, Duration} from 'aws-cdk-lib';
import { Table, AttributeType,BillingMode} from 'aws-cdk-lib/aws-dynamodb';

export class PlannerDynamoDBStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB 테이블 생성
    const dataTable = new Table(this, 'PlannerData', {
        tableName : 'PlannerData',
        partitionKey: { name: 'ID', type: AttributeType.STRING },
        sortKey: { name: 'DATE', type: AttributeType.STRING },
        billingMode: BillingMode.PAY_PER_REQUEST,
        removalPolicy: cdk.RemovalPolicy.DESTROY, // 스택 삭제시 테이블도 함께 삭제합니다.
    });
  }
}