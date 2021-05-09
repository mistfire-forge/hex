import { Button, Container, Grid } from '@material-ui/core'
import { query as q } from 'faunadb'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { CreateMapDialog } from '../components/CreateMapDialog'

import { MapGridItem } from '../components/MapGridItem'
import { Spinner } from '../components/Spinner'
import { TitleBar } from '../components/TitleBar'
import { globalState } from '../utils/globalState'

interface MapQueryResults {
  data: [
    number, // TS
    string // Map Name
  ][]
}

interface MapListData {
  name: string
  data?: string // TODO
}

export function MyMaps(): ReactElement {
  const [loading, setLoading] = useState(true)
  const [mapsList, setMapsList] = useState<MapListData[] | null>(null)
  const [displayDialog, setDisplayDialog] = useState(false)

  const handleOpenDialog = useCallback(() => {
    setDisplayDialog(true)
  }, [])

  useEffect(() => {
    const fetchMaps = async (): Promise<void> => {
      if (globalState.client == null) {
        // TODO: Display Error
        return
      }

      setLoading(true)

      try {
        const result: MapQueryResults = await globalState.client.query(
          q.Paginate(q.Match('map-list-info-by-creator', q.CurrentIdentity()))
        )

        const map = result.data.map(element => ({ name: element[1] }))
        setMapsList(map)
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }

    fetchMaps()
  }, [])

  if (loading) {
    return <Spinner />
  }

  let MapListing: ReactElement
  if (mapsList?.length ?? 0 > 0) {
    MapListing = (
      <Grid container spacing={3}>
        {mapsList?.map(element => (
          <MapGridItem
            name={element.name}
            key={element.name}
            imageURL='http://placekitten.com/400/300'
          />
        ))}
      </Grid>
    )
  } else {
    MapListing = <div>No Maps!</div>
  }

  return (
    <Container maxWidth='md'>
      <CreateMapDialog
        displayDialog={displayDialog}
        setDisplayDialog={setDisplayDialog}
      />
      <TitleBar
        title='My Maps'
        endElement={
          <Button color='primary' variant='outlined' onClick={handleOpenDialog}>
            Create Map
          </Button>
        }
      />
      {MapListing}
    </Container>
  )
}
