import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

import { SYSTEM_NAME } from '../config/commons';

export class PlannerS3Stack extends cdk.Stack {
    public bucket: s3.IBucket;
    
    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        // S3 버킷 생성
        const bucket = new s3.Bucket(this, `${SYSTEM_NAME}-S3`, {
            bucketName: `planner-file-bucket`,
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED
        });

        this.bucket = bucket;
    }
}