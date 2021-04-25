import { Client } from 'faunadb'
export { query } from 'faunadb'

export const createClient = (key: string = FAUNA_ACCESS_KEY): Client => {
  return new Client({
    secret: key,
    fetch: (url: RequestInfo, params?: RequestInit): Promise<Response> => {
      const signal = params && params.signal
      if (params && params.signal) {
        delete params.signal
      }
      const abortPromise = new Promise<any>(resolve => {
        if (signal) {
          signal.onabort = resolve
        }
      })
      return Promise.race<Response>([abortPromise, fetch(url, params)])
    },
  })
}
