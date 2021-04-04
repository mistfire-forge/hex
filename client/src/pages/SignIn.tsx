import React, { FormEvent, ReactElement, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'

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

export function SignIn(): ReactElement {
  const classes = useStyles()

  const isLoading = false

  // Refs for inputs
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

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
