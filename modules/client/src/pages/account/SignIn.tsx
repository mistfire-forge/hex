import React, {
  FormEvent,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'

import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Link,
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { APIResponse, postRequest } from '../../utils/apiCall'
import { globalState, UserData } from '../../utils/globalState'

enum SignInError {
  ValidationError,
  ServerError,
}

export function SignIn(): ReactElement {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(false)

  // TODO: Show Errors
  const [error, setError] = useState<SignInError | null>(null)

  // Refs for inputs
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!password) {
      setError(SignInError.ValidationError)
      return
    }

    setIsLoading(true)

    try {
      const result = await signInRequest(email!, password!)

      if (!result.success) {
        // TODO
        console.error('Request Failed', result)
        setError(SignInError.ServerError)
      } else {
        globalState.user = result.data.user

        // TODO
        console.log('Location State', location.state)
        history.replace('/')
      }
    } catch (error) {
      // TODO
      console.log(error)
      setError(SignInError.ServerError)
    }

    setIsLoading(false)
  }, [])

  return (
    <Container maxWidth='sm'>
      <Card className={classes.card}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
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
            id='password1'
            name='password1'
            label='Password'
            inputRef={passwordRef}
          />
          <Button
            className={classes.button}
            type='submit'
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress /> : 'Login'}
          </Button>
        </form>

        <div className={classes.linkSection}>
          <Link variant='body2' component={RouterLink} to='/forgot-password'>
            Forgot password?
          </Link>

          <div className={classes.spacer} />

          <Link variant='body2' component={RouterLink} to='/create-account'>
            Create a new account
          </Link>
        </div>
      </Card>
    </Container>
  )
}

interface SignInResponse extends APIResponse {
  data: {
    user: UserData
  }
}

async function signInRequest(email: string, password: string) {
  return (await postRequest('sign-in', {
    body: JSON.stringify({
      email,
      password,
    }),
  })) as SignInResponse
}

const useStyles = makeStyles(theme => ({
  card: {
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
  button: {
    margin: theme.spacing(2, 0, 1),
    height: 50, // This should be the height of the Progress Indicator
  },
  linkSection: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  spacer: {
    flex: 1,
  },
}))
