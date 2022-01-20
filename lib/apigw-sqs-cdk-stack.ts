import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { SQSIntegration } from './constructs/sqs-integration.construct';
import { SQSApiGatewayRole } from './constructs/sqs-api-gateway-role.construct';
import { ApiMethodOptions } from './constructs/api-method-options.construct';



export class ApigwSqsCdkStack extends Stack {
 

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //Create the SQS Queue
    const messageQueue = new sqs.Queue(this, "Queue", {
      queueName: "APIGWMessages",
    });

    //Create a role assumed by the APIGW Principal with Allow send message to the SQS Queue
    const sqsApiGatewayRole = new SQSApiGatewayRole(
      this,
      "Api Gateway Role Construct",
      {
        messageQueue: messageQueue,
      }
    );

    //Create an integration that allows the API to expose the SQS Queue
    const sqsIntegration = new SQSIntegration(
      this,
      "SQS Integration Construct",
      {
        messageQueue: messageQueue,
        apiGatewayRole: sqsApiGatewayRole.role,
      }
    );

    //create the API in ApiGateway
    const restApi = new apigw.RestApi(this, "API Endpoint", {
      deployOptions: {
        stageName: "sandbox",
      },
      restApiName: "APIGWtoSQSApi",
    });

    //Create a method options object with validations and transformations
    const apiMethodOptions = new ApiMethodOptions(
      this,
      "API Method Options Construct",
      {
        restApi: restApi,
      }
    );

    //Create a Resource Method, that combines the sqs integration, message validation and transformation
    restApi.root.addMethod(
      "POST",
      sqsIntegration.integration,
      apiMethodOptions.methodOptions
    );
  }
}
