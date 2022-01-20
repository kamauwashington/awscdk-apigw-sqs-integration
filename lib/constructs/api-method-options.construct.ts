//Create an IAM Role for API Gateway to assume
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { GeoModel } from "./geo-model.construct";

/**
 * These are the properties expected by the ApiMethodOptions Construct
 */ 
export interface IApiMethodOptionsProps {
  restApi: apigw.RestApi;
}

/**
 * This Construct creates the Api Gateway endpoint Request and Response that affronts the SQS integration.
 */
export class ApiMethodOptions extends Construct {
  readonly methodOptions: apigw.MethodOptions;

  constructor(scope: Construct, id: string, props: IApiMethodOptionsProps) {
    super(scope, id);

    /**
     * Create the GeoModel to attach to the Request
     */
    const geoModel = new GeoModel(this, "Geo Model Construct", {
      restApi: props.restApi,
    });

    /**
     * Create a method response for API Gateway using the empty model, which will
     * return the response from the integration unmapped
     */ 
    const methodResponse: apigw.MethodResponse = {
      statusCode: "200",
      responseModels: { "application/json": apigw.Model.EMPTY_MODEL },
    };

    /**
     * Create a validator for the API, apply that validation to the Request for the ContentType
     * of "application/json", and add the "passthrough" Response as Method Options for the API
     */
    const methodOptions: apigw.MethodOptions = {
      methodResponses: [methodResponse],
      requestValidator: new apigw.RequestValidator(this, "body-validator", {
        restApi: props.restApi,
        requestValidatorName: "body-validator",
        validateRequestBody: true,
      }),
      requestModels: {
        "application/json": geoModel.model,
      },
    };
      
    this.methodOptions = methodOptions;
  }
}
