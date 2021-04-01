import * as awsx from '@pulumi/awsx'
import { createLambda } from '../utils/createLambda'
import { authorizer } from '../utils/authorizer'

const handler = async (
  event: awsx.apigateway.Request
): Promise<awsx.apigateway.Response> => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stage: event.requestContext.stage,
      headers: event.headers,
    }),
  }
}

export const me: awsx.apigateway.Route = {
  path: '/me',
  method: 'GET',
  eventHandler: createLambda('me', handler),
  authorizers: authorizer,
}
