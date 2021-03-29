import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import { preName } from './preName'

const accountId = pulumi.output(aws.getCallerIdentity({ async: true }))
  .accountId
const executionRoleName = preName('lambda-execution-role')
const executionRolePolicyName = `${executionRoleName}-policy`

export const lambdaExecutionRole = new aws.iam.Role(executionRoleName, {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: ['lambda.amazonaws.com', 'apigateway.amazonaws.com'],
  }),
})

new aws.iam.RolePolicy(executionRolePolicyName, {
  name: executionRolePolicyName,
  role: lambdaExecutionRole,
  policy: {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Action: 'ssm:GetParameter',
        Resource: accountId.apply(
          (id: string) =>
            `arn:aws:ssm:${
              aws.config.region
              // TODO: Config parameter based on SSM Param output
            }:${id}:parameter/hex/fauna/${pulumi.getStack()}/*`
        ),
      },
    ],
  },
})
