import { Collection, Index } from '@triangularcube/fauna-pulumi-provider'

const users = new Collection('users')
const games = new Collection('matches')

const userMailIndex = new Index('user-by-email', {
  source: 'users',
  terms: [{ field: ['data', 'email'] }],
  unique: true,
})

const userDisplayNameIndex = new Index('user-by-displayname', {
  source: 'users',
  terms: [{ field: ['data', 'displayName'] }],
  unique: true,
})

const matchesByPlayers = new Index('matches-by-players', {
  source: 'matches',
  terms: [{ field: ['data', 'players'] }],
})
