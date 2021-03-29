import * as pulumi from '@pulumi/pulumi'
import { Collection, Index } from 'fauna-pulumi-provider'

const users = new Collection('users')
const games = new Collection('matches')

const matchesByPlayers = new Index('matches-by-players', {
  source: 'matches',
  terms: [{ field: ['data', 'players'] }],
})
