import { Config, Output } from '@pulumi/pulumi'
import * as awsx from '@pulumi/awsx'
import * as aws from '@pulumi/aws'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { preName } from './preName'
import { lambdaExecutionRole } from './lambdaExecutionRole'

const faunaAccessKey: Output<string> | string =
  process.env.FAUNA_ACCESS_KEY ?? new Config().requireSecret('faunaAccessKey')

export const createLambda = (
  name: string,
  handler: (event: awsx.apigateway.Request) => Promise<awsx.apigateway.Response>
): aws.lambda.CallbackFunction<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const callback = new aws.lambda.CallbackFunction(preName(name), {
    callback: handler,
    role: lambdaExecutionRole,
    environment: {
      variables: {
        FAUNA_ACCESS_KEY: faunaAccessKey,
      },
    },
  })

  return callback
}
