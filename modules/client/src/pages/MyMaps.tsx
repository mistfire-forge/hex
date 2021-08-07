import { Button, Container, Grid } from '@material-ui/core'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { CreateMapDialog } from '../components/CreateMapDialog'

import { MapGridItem } from '../components/MapGridItem'
import { Spinner } from '../components/Spinner'
import { TitleBar } from '../components/TitleBar'
import { APIResponse, getRequest } from '../utils/apiCall'

interface MapListData {
  name: string
  id: string
  ts: number
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
      setLoading(true)

      const result = await getMyMaps()

      if (result.success) {
        setMapsList(result.data)
      } else {
        console.log('Failed', result.error)
        // TODO: Set Error
      }

      setLoading(false)
    }

    fetchMaps()
  }, [])

  if (loading) {
    return <Spinner />
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
      {!!mapsList && mapsList.length > 0 ? (
        <Grid container spacing={3}>
          {mapsList.map(element => (
            <MapGridItem
              name={element.name}
              key={element.id}
              id={element.id}
              // TODO
              imageURL='http://placekitten.com/410/300'
            />
          ))}
        </Grid>
      ) : (
        // TODO
        <div>No Maps!</div>
      )}
    </Container>
  )
}

interface MapQueryResponse extends APIResponse {
  data: MapListData[]
}

async function getMyMaps() {
  return (await getRequest('/my-maps')) as MapQueryResponse
}
