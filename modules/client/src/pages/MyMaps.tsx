import { Button, Container, Grid } from '@material-ui/core'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { CreateMapDialog } from '../components/CreateMapDialog'

import { MapGridItem } from '../components/MapGridItem'
import { Spinner } from '../components/Spinner'
import { TitleBar } from '../components/TitleBar'
import { getRequest } from '../utils/apiCall'

type MapQueryResults = [
  number, // TS
  string, // Map Name
  {
    '@ref': {
      id: number
    }
  }
][]

interface MapListData {
  name: string
  refId: number
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
      setLoading(true)

      const result = await getRequest('/my-maps')

      if (result.success) {
        const list = (result.data as MapQueryResults).map(element => ({
          name: element[1],
          refId: element[2]['@ref'].id,
        }))

        setMapsList(list)
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
              id={element.refId}
              key={element.refId}
              imageURL='http://placekitten.com/400/300'
            />
          ))}
        </Grid>
      ) : (
        <div>No Maps!</div>
      )}
    </Container>
  )
}
