import { GetParameterCommandOutput } from '@aws-sdk/client-ssm'

export async function getParameter(
  name: string
): Promise<GetParameterCommandOutput> {
  const { SSM } = await import('@aws-sdk/client-ssm')
  return new SSM({}).getParameter({ Name: name, WithDecryption: true })
}
