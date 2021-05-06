import {
  Collection,
  Index,
  Role,
  query as q,
  Function,
} from 'fauna-pulumi-provider'

const users = new Collection('users')
const maps = new Collection('maps')
const matches = new Collection('matches')

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

const matchesByPlayersIndex = new Index('matches-by-players', {
  source: 'matches',
  terms: [{ field: ['data', 'players'] }],
})

const mapsByCreatorIndex = new Index(
  'maps-by-creator',
  {
    source: 'maps',
    terms: [{ field: ['data', 'creator'] }],
  },
  {
    dependsOn: [maps],
  }
)

const createMapRole = new Role(
  'create-map-role',
  {
    privileges: [
      {
        resource: q.Collection(maps.name),
        actions: {
          create: true,
        },
      },
    ],
  },
  {
    dependsOn: [maps],
  }
)

const createMapFunction = new Function(
  'create-map',
  {
    body: q.Query((name: string) =>
      q.Create(q.Collection(maps.name), {
        data: {
          name: name,
          creator: q.CurrentIdentity(),
          created: q.ToDate(q.Now()),
        },
      })
    ),
    role: q.Role(createMapRole.name),
  },
  {
    dependsOn: [createMapRole],
  }
)

const playerRole = new Role(
  'player-role',
  {
    name: 'player',
    privileges: [
      {
        resource: q.Collection('users'),
        actions: {
          // A player can read their own account data
          read: q.Query(ref => q.Equals(q.CurrentIdentity(), ref)),
        },
      },
      {
        resource: q.Collection('maps'),
        actions: {
          read: q.Query(ref =>
            q.Let(
              {
                doc: q.Get(ref),
              },
              q.Or(
                // A player can read any public map
                q.Select(['data', 'published'], q.Var('doc'), false),

                // A player can read his own maps
                q.Equals(
                  q.Select(['data', 'creator'], q.Var('doc'), false),
                  q.CurrentIdentity()
                )
              )
            )
          ),
        },
      },
      {
        resource: q.Function(createMapFunction.name),
        actions: {
          call: true,
        },
      },
    ],
    membership: [
      {
        resource: q.Collection('users'),
      },
    ],
  },
  {
    dependsOn: [users, maps],
  }
)
