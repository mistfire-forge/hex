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
import { query as q } from 'faunadb'

import { globalState } from '../utils/globalState'
import { Spinner } from './Spinner'

const useStyles = makeStyles({
  dialogActions: { paddingLeft: 15, paddingRight: 15 },
})

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
    await createMap(mapName)
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

async function createMap(name: string) {
  if (globalState.client == null) {
    return
  }

  try {
    const response = await globalState.client.query(
      q.Call(q.Function('create-map'), name)
    )

    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
