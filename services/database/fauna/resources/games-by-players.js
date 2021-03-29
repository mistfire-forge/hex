import { query as q } from 'faunadb'

const { CreateIndex, Collection } = q

export default CreateIndex({
  name: 'games-by-players',
  source: Collection('games'),
  terms: [{field: ['data', 'players']}]
})