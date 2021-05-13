import React, {
  FormEvent,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@material-ui/core'
import { Person } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { globalState } from '../../utils/globalState'
import { postRequest } from '../../utils/apiCall'
import { useSnapshot } from 'valtio'

enum ErrorType {
  NetworkError,
  RequestError,
}

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
  const snapshot = useSnapshot(globalState)
  if (snapshot.user != null) {
    return <Redirect to='/' />
  }

  const classes = useStyles()
  const history = useHistory()

  const emailRef = useRef<HTMLInputElement | null>(null)
  const displayNameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<ErrorType | null>(null)

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    // TODO: Handle Form Validation

    if (
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !displayNameRef.current?.value
    ) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createAccountRequest(
        emailRef.current?.value,
        displayNameRef.current?.value,
        passwordRef.current?.value
      )

      if (!result.success) {
        setError(ErrorType.RequestError)
      } else {
        globalState.user = result.data.user
        history.push('/')
      }
    } catch (error) {
      setError(ErrorType.NetworkError)
    }

    setIsSubmitting(false)
  }, [])

  // TODO: Listen to other login activities with Broadcast

  let emailError = false
  let displayNameError = false
  let passwordError = false

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
            error={emailError}
            helperText={''} // TODO
          />

          <TextField
            fullWidth={true}
            margin='normal'
            label='Display Name'
            type='text'
            name='displayName'
            id='displayName'
            inputRef={displayNameRef}
            error={displayNameError}
            helperText={''} // TODO
          />

          {/* TODO: Enforce password length */}
          <TextField
            fullWidth={true}
            margin='normal'
            id='password'
            name='password'
            label='Password (10+ characters)'
            inputRef={passwordRef}
            error={passwordError}
            helperText={''} // TODO
          />

          <Button
            type='submit'
            disabled={isSubmitting}
            fullWidth
            className={classes.submit}
          >
            {isSubmitting ? <CircularProgress /> : 'Create'}
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
  const result = await postRequest('create-account', {
    body: JSON.stringify({
      email,
      displayName,
      password,
    }),
  })

  return await result.json()
}
