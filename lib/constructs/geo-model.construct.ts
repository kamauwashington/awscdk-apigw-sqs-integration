//Create an IAM Role for API Gateway to assume
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";

/**
 * These are the properties expected by the GeoModel Construct
 */ 
export interface IGeoModelProps {
    restApi: apigw.RestApi;
}

/**
 * This Construct creates the validation schema for the Api Gateway Request
 */
export class GeoModel extends Construct {
  readonly model: apigw.Model;

  constructor(scope: Construct, id: string, props: IGeoModelProps) {
    super(scope, id);

    /**
     * This model defines standard Geolocation JSON validation using JSON Schema
     * https://json-schema.org/learn/examples/geographical-location.schema.json
     * 
     * https://json-schema.org/
     */
    const geoModel = new apigw.Model(this, 'geo-model-validator', {
			restApi: props.restApi,
			contentType: 'application/json',
			description: 'Validates a set of coordinates',
			modelName: 'geoModel',
			schema: {
				type: apigw.JsonSchemaType.OBJECT,
				required: ['latitude', 'longitude', 'userId'],
				properties: {
					userId: {
						type: apigw.JsonSchemaType.STRING,
						pattern: '^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$',
					},
					latitude: {
						type: apigw.JsonSchemaType.NUMBER,
						minimum: -90,
						maximum: 90,
					},
					longitude: {
						type: apigw.JsonSchemaType.NUMBER,
						minimum: -180,
						maximum: 180,
					},
				},
			},
		});

    this.model = geoModel;
  }
}
