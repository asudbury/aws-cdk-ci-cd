import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class AwsCdkCiCdStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /// Lambda Function

    const lambdaFunction = new lambda.Function(this, 'HelloHandler-' + id, {
      functionName: 'HelloHandler-' + id,
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler',
      environment: {
        BUCKET: 'myBucket',
      },
    });

    /// Api Gateway

    const api = new apigateway.RestApi(this, 'awsCdkCICDApiGateway-' + id, {
      restApiName: 'aws-cdk-ci-cd-gateway-' + id,
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    });

    api.root.addMethod('GET', lambdaIntegration);
  }
}
