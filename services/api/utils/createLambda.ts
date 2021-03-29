import * as awsx from '@pulumi/awsx'
import * as aws from '@pulumi/aws'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { preName } from './preName'
import { lambdaExecutionRole } from './lambdaExecutionRole'

export const createLambda = (
  name: string,
  handler: (event: awsx.apigateway.Request) => Promise<awsx.apigateway.Response>
): aws.lambda.CallbackFunction<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const callback = new aws.lambda.CallbackFunction(preName(name), {
    callback: handler,
    role: lambdaExecutionRole,
  })

  return callback
}
