import * as awsx from '@pulumi/awsx'
import * as aws from '@pulumi/aws'

import { preName } from '../utils/preName'

const authFunction = async (
  event: awsx.apigateway.AuthorizerEvent
): Promise<awsx.apigateway.AuthorizerResponse> => {
  const token = event.authorizationToken

  if (token === 'Allow') {
    return awsx.apigateway.authorizerResponse('user', 'Allow', event.methodArn)
  }
  return awsx.apigateway.authorizerResponse('user', 'Deny', event.methodArn)
}

const authorizerRole = new aws.iam.Role('authorizer-role', {
  name: preName('authorizer-role'),
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    // Apparently this will fail if both is not allowed to assume role
    Service: ['apigateway.amazonaws.com', 'lambda.amazonaws.com'],
  }),
})

const authorizerLambda = new aws.lambda.CallbackFunction('authorizer', {
  name: preName('authorizer'),
  runtime: aws.lambda.NodeJS12dXRuntime,
  callback: authFunction,
  role: authorizerRole,
})

new aws.iam.RolePolicy('authorizer-role-policy', {
  name: preName('authorizer-role-policy'),
  policy: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'lambda:InvokeFunction',
        Effect: 'Allow',
        Resource: authorizerLambda.arn,
      },
    ],
  },
  role: authorizerRole,
})

const authorizerInfo: awsx.apigateway.LambdaAuthorizerInfo = {
  uri: authorizerLambda,
  credentials: authorizerRole,
}

export const authorizer = awsx.apigateway.getTokenLambdaAuthorizer({
  handler: authorizerInfo,
})

// const gatewayRole = new aws.iam.Role('gateway-role', {
//   name: preName('gateway-role'),
//   assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
//     Service: ['apigateway.amazonaws.com'],
//   }),
// })

// new aws.iam.RolePolicy('gateway-invocation-policy', {
//   name: preName('gateway-invocation-policy'),
//   policy: {
//     Version: '2012-10-17',
//     Statement: [
//       {
//         Action: 'lambda:InvokeFunction',
//         Effect: 'Allow',
//         Resource: authorizerLambda.arn,
//       },
//     ],
//   },
//   role: gatewayRole,
// })

// const tokenAuthorizer = awsx.apigateway.getTokenLambdaAuthorizer({
//   handler: authorizerHandler,
//   authorizerResultTtlInSeconds: 0,
// })
