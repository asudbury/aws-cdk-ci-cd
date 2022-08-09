import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkCiCdStack } from '../lib/aws-cdk-ci-cd-stack';

const app = new cdk.App();
new AwsCdkCiCdStack(app, 'AwsCdkCiCdStack', {});
