import * as pulumi from '@pulumi/pulumi'

export function preName(name?: string): string {
  const namePrefix = `${pulumi.getProject()}-${pulumi.getStack()}`
  return name ? `${namePrefix}-${name}` : namePrefix
}
