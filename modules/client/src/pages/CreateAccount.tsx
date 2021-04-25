import React, { FormEvent, ReactElement, useCallback, useRef } from "react";
import { Redirect } from 'react-router-dom'

import {
  Avatar,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from '@material-ui/core'
import { Person } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { globalState } from '../utils/globalState'
import { makeApiCall } from '../utils/apiCall'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
    height: 50, // This should be the height of the Progress Indicator
  },
}))

export function CreateAccount(): ReactElement {
  if (globalState.authToken != null) {
    return <Redirect to='/' />
  }

  const classes = useStyles()

  const emailRef = useRef<HTMLInputElement | null>(null)
  const displayNameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !displayNameRef.current?.value
    ) {
      return
    }
    await createAccountRequest(
      emailRef.current?.value,
      displayNameRef.current?.value,
      passwordRef.current?.value
    )
  }, [])

  // TODO: Listen to other login activities with Broadcast

  return (
    <Container maxWidth='sm'>
      <Card className={classes.container}>
        <Avatar className={classes.avatar}>
          <Person />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth={true}
            margin='normal'
            label='Email Address'
            type='email'
            name='email'
            id='email'
            inputRef={emailRef}
          />

          <TextField
            fullWidth={true}
            margin='normal'
            label='Display Name'
            type='text'
            name='displayName'
            id='displayName'
            inputRef={displayNameRef}
          />

          {/* TODO: Enforce password length */}
          <TextField
            fullWidth={true}
            margin='normal'
            id='password'
            name='password'
            label='Password (10+ characters)'
            inputRef={passwordRef}
          />

          <Button type='submit' fullWidth className={classes.submit}>
            Create
          </Button>
        </form>
      </Card>
    </Container>
  )
}

async function createAccountRequest(
  email: string,
  displayName: string,
  password: string
) {
  const result = await makeApiCall('create-account', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      displayName,
      password,
    }),
  })

  console.log(await result.json())
}
