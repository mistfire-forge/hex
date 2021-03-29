import { query as q } from 'faunadb'

const { CreateCollection } = q

export default CreateCollection({
  name: `games`
})
