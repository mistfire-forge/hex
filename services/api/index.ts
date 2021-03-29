import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'

import { preName } from './utils/preName'
import { me } from './routes'

const config = new pulumi.Config()

let faunaAccessKey: pulumi.Output<string> | string | undefined =
  process.env.FAUNA_ACCESS_KEY
if (faunaAccessKey == null) {
  faunaAccessKey = config.requireSecret('faunaAccessKey')
}

new aws.ssm.Parameter(preName('fauna-access-key'), {
  name: `/hex/fauna/${pulumi.getStack()}/fauna-access-key`,
  type: 'SecureString',
  value: faunaAccessKey,
})

const gateway = new awsx.apigateway.API(preName('gateway'), {
  routes: [me],
  stageName: pulumi.getStack(),
})

let certId: pulumi.Output<string> | string | undefined = process.env.HEX_CERT_ID
if (certId == null) {
  certId = config.requireSecret('hexCertId')
}

const domainName = `${pulumi.getStack()}.api.hexahedron.io`

const webDomain = new aws.apigateway.DomainName(preName(`domain-cdn`), {
  certificateArn: certId,
  domainName,
})

new aws.apigateway.BasePathMapping(preName(`base-mapping`), {
  restApi: gateway.restAPI,
  stageName: gateway.stage.stageName,
  domainName: webDomain.id,
})

export const domain = webDomain.cloudfrontDomainName
