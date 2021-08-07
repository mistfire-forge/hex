import React, { ReactElement, useRef, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import { APIResponse, postRequest } from '../utils/apiCall'
import { Spinner } from './Spinner'

interface CreateMapDialogProps {
  displayDialog: boolean
  setDisplayDialog: (display: boolean) => void
}
export function CreateMapDialog({
  displayDialog,
  setDisplayDialog,
}: CreateMapDialogProps): ReactElement {
  const classes = useStyles()

  const newMapNameRef = useRef<HTMLInputElement>()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleCancelDialog = () => {
    setDisplayDialog(false)
    setLoading(false)

    // TODO: Refresh all values
  }

  const confirm = async () => {
    const mapName = newMapNameRef.current?.value
    if (mapName == null || mapName.length < 1) {
      console.error('No Name!')
      return
    }

    setLoading(true)
    const response = await createMap(mapName)

    if (response.success) {
      history.push(`/edit/${response.data.id}`)
      return
    }

    // TODO Some error message

    setLoading(false)
  }

  return (
    <Dialog
      open={displayDialog}
      onClose={handleCancelDialog}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle>Create New Map</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label='Map Name'
          fullWidth
          inputRef={newMapNameRef}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleCancelDialog} color='secondary'>
          Cancel
        </Button>

        {/* Spacing */}
        <div style={{ flex: 1 }} />

        <Button onClick={confirm} disabled={loading} color='primary'>
          {/* TODO: Set spinner height properly */}
          {loading ? <Spinner /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface CreateMapResponse extends APIResponse {
  data: {
    id: string
  }
}

async function createMap(name: string): Promise<CreateMapResponse> {
  return (await postRequest('/create-map', {
    body: JSON.stringify({
      name,
    }),
  })) as CreateMapResponse
}

const useStyles = makeStyles({
  dialogActions: { paddingLeft: 15, paddingRight: 15 },
})
