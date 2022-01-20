# API Gateway SQS Integration w/ AWS CDK 2.0

> This repository is purely for reference and is illustrative in it is purpose. This is one of the many ways of achieving this type of integration.


This project illustrates using the AWS CDK v2 to create an API Gateway endpoint that posts directly into an SQS Queue. A solutions seen often is Api Gateway to
Lambda to SQS, which as a pattern has its uses, however, this can be a lighter implementation if the requirements warrant it.

This example contains request validation, simple VTL transformation as a response, and stack organization by Construct.

## Prerequisites

Before you continue, ensure you have met the following requirements:

* AWS CDK CLI 2.8.0 or higher (or use npx)
* an AWS profile configured in **~/.aws/config** and **~/.aws/credentials**
    * there are instructions to set up an Access Key Credential Type [here](https://cdkworkshop.com/15-prerequisites/200-account.html).

## Installation

* clone this repository into a directory of your choosing
* run **npm install** in that directory 

## Deployment

This project does not use the standard environment in code solution seen often and opts for AWS profiles instead.

* run **cdk deploy --profile \<your profile name\>** if you have defined a non default profile in the **~/.aws** files
* run **cdk deploy** if you have defined a default profile and would wish to use it
## Notes

* This repository is heavily commented to provide context as to what and why, if in VS Code feel free to collapse all comments if they are obtrusive
    * On Mac -> Press <kbd>&#8984;</kbd> + <kbd>K</kbd> then <kbd>&#8984;</kbd> + <kbd>/</kbd> 
    * On Windows & Linux -> Press <kbd>Ctrl</kbd> + <kbd>K</kbd> then <kbd>Ctrl</kbd> + <kbd>/</kbd> 
* Generally one would use Constructs to create reusable functionality. In this repository they are used for organization
and readability of the code base. There are many available examples that illustrate a large stack completely in the constructor of the stack alone. 
Seems hard to maintain ¯\\\_(ツ)_/¯
