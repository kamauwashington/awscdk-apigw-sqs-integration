#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApigwSqsCdkStack } from '../lib/apigw-sqs-cdk-stack';

const app = new cdk.App();
new ApigwSqsCdkStack(app, 'ApigwSqsCdkStack', {});