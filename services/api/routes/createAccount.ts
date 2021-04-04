import * as awsx from '@pulumi/awsx'
import { createLambda } from '../utils/createLambda'
import { getParameter } from '../utils/getParameter'

const handler = async (
  event: awsx.apigateway.Request
): Promise<awsx.apigateway.Response> => {
  const param = await getParameter(
    `/hex/fauna/${event.requestContext.stage}/fauna-access-key`
  )

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stage: event.requestContext.stage,
      counter: process.env.FAUNA_ACCESS_KEY,
      headers: event.headers,
    }),
  }
}

export const createAccount: awsx.apigateway.Route = {
  path: '/create-account',
  method: 'POST',
  eventHandler: createLambda('create-account', handler),
}
