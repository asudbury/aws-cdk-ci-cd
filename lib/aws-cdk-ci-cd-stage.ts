import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsCdkCiCdStack } from './aws-cdk-ci-cd-stack';

export class AwsCdkCiCdStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new AwsCdkCiCdStack(this, 'AwsCdkCiCdStack');
  }
}
