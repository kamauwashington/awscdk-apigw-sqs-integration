//Create an IAM Role for API Gateway to assume
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as sqs from "aws-cdk-lib/aws-sqs";

/**
 * These are the properties expected by the SQSApiGatewayRole Construct
 */ 
export interface IApiGatewayRoleProps {
    messageQueue: sqs.Queue;
}

/**
 * This Construct creates the Policy and Role that allows Api Gateway send Message access to SQS
 */
export class SQSApiGatewayRole extends Construct {
  role: iam.Role; // this will be used by the parent stack to combine with other Constructs

  constructor(scope: Construct, id: string, props: IApiGatewayRoleProps) {
    super(scope, id);

    /**
     * create a policy statement that allows sending messages to the message queue
     */
    const policyStatement = new iam.PolicyStatement({
      actions: ["sqs:SendMessage"],
      effect: iam.Effect.ALLOW,
      resources: [props.messageQueue.queueArn],
    });

    /**
     * Create a policy to house policy statements statements. An example would be that we could also
     * add policy statements to allow sqs:ReceiveMessage, and sqs:DeleteMessage
     */
    const policy = new iam.Policy(this, "SendMessagePolicy", {
      statements: [policyStatement],
    });

    /**
     * Create a role that can be assumed by API Gateway to integrate with the SQS Queue
     */
    const role = new iam.Role(this, "APIGWtoSQSExampleRole", {
      assumedBy: new iam.ServicePrincipal("apigateway.amazonaws.com"),
      roleName: "APIGWtoSQSExampleRole",
    });

    /**
     * Attach the API Gateway Integration role to the declared ALLOW sqs:SendMessage policy
     */
    role.attachInlinePolicy(policy);

    this.role = role;
  }
}





