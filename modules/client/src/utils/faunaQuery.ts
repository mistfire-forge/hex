import { Expr } from 'faunadb'
import { globalState } from './globalState'

export async function makeQuery<T>(query: Expr): Promise<T> {
  if (globalState.client == null) {
    console.error('Not logged in, no Fauna Client')
    throw new Error('No Fauna Client')
  }

  try {
    return await globalState.client.query(query)
  } catch (error) {
    throw new Error(error.requestResult.requestContent)
  }
}
