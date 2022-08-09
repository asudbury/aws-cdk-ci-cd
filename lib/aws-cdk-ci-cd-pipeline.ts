import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline,
  CodePipelineSource,
  ManualApprovalStep,
  ShellStep,
} from 'aws-cdk-lib/pipelines';
import { AwsCdkCiCdStage } from './aws-cdk-ci-cd-stage';

export class AwsCdkCiCdPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /// change to required repository
    const repo = 'asudbury/aws-cdk-ci-cd-stack';

    /// change to required branch
    const branch = 'main';

    const pipeline = new CodePipeline(this, 'AwsCdkCiCdPipeline', {
      pipelineName: 'aws-cdk-ci-cd-pipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(repo, branch),

        // The build steps for the pipeline are defined by these commands
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    /// a simple test and production stages example

    pipeline.addStage(
      new AwsCdkCiCdStage(this, 'test', {
        env: {
          region: process.env.CDK_DEFAULT_REGION,
          account: process.env.CDK_DEFAULT_ACCOUNT,
        },
      })
    );

    const productionStage = pipeline.addStage(
      new AwsCdkCiCdStage(this, 'production', {
        env: {
          region: process.env.CDK_DEFAULT_REGION,
          account: process.env.CDK_DEFAULT_ACCOUNT,
        },
      })
    );

    productionStage.addPost(new ManualApprovalStep('Manual approval step'));
  }
}
