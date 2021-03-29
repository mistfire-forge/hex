import { query as q } from 'faunadb'

const { CreateIndex, Collection } = q

export default CreateIndex({
  name: 'games-by-players',
  source: Collection('games'),
  terms: [{field: ['data', 'players']}],
  data: {
    description: "This is an index of games by players"
  }
})