import * as awsx from '@pulumi/awsx'
import { createLambda } from '../utils/createLambda'

const handler = async (
  event: awsx.apigateway.Request
): Promise<awsx.apigateway.Response> => {
  return {
    statusCode: 200,
    body: event.requestContext.stage,
  }
}

export const me: awsx.apigateway.Route = {
  path: '/me',
  method: 'GET',
  eventHandler: createLambda('me', handler),
}
