import {
  Collection,
  Index,
  Role,
  query as q,
  Function,
} from 'fauna-pulumi-provider'

// region Collections
const users = new Collection('users')
const maps = new Collection('maps')
const matches = new Collection('matches')
// endregion

// region Indexes
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

const tokensByUserIndex = new Index('tokens-by-user', {
  source: q.Tokens(),
  terms: [{ field: ['instance'] }],
  values: [
    {
      field: ['data', 'created'],
      reverse: true,
    },
    {
      field: ['ref'],
    },
  ],
})
// endregion

// region Maps
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

const mapListInfoByCreatorIndex = new Index(
  'map-list-info-by-creator',
  {
    source: [
      {
        collection: 'maps',
      },
    ],
    terms: [{ field: ['data', 'creator'] }],
    values: [
      {
        field: ['ts'],
      },
      {
        field: ['data', 'name'],
      },
      {
        field: ['ref'],
      },
    ],
  },
  {
    dependsOn: [maps],
  }
)
// endregion

const playerRole = new Role(
  'player-role',
  {
    name: 'player',
    privileges: [
      {
        resource: q.Collection(users.name),
        actions: {
          // A player can read their own account data
          read: q.Query(ref => q.Equals(q.CurrentIdentity(), ref)),
        },
      },
      {
        resource: q.Collection(maps.name),
        actions: {
          read: q.Query(ref =>
            q.Let(
              {
                doc: q.Get(ref),
              },
              q.Or(
                // A player can read any published map
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
        resource: q.Index(mapListInfoByCreatorIndex.name),
        actions: {
          read: true,
        },
      },
      {
        // Players can create maps
        resource: q.Function(createMapFunction.name),
        actions: {
          call: true,
        },
      },
      {
        resource: q.Tokens(),
        actions: {
          // Users can read their own tokens
          read: q.Query(ref =>
            q.Equals(q.Select(['instance'], q.Get(ref)), q.CurrentIdentity())
          ),
        },
      },
      {
        // Allow reading of the index for Tokens
        resource: q.Index(tokensByUserIndex.name),
        actions: {
          read: true,
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
    dependsOn: [users, maps, mapListInfoByCreatorIndex, createMapFunction],
  }
)
