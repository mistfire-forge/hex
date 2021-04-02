import React, { ChangeEvent, FC, ReactElement } from 'react'
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { TargetName, targetState } from '../utils/currentTarget'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export const TargetSelection: FC = (): ReactElement => {
  const classes = useStyles()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    targetState.targetName = event.target.value
  }

  return (
    <Container maxWidth='xs'>
      <div className={classes.container}>
        <form>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>API Target</FormLabel>

            <RadioGroup
              defaultValue={targetState.targetName}
              onChange={handleChange}
            >
              <FormControlLabel
                value={TargetName.Edge}
                control={<Radio />}
                label='Edge'
              />
              <FormControlLabel
                value={TargetName.Dev}
                control={<Radio />}
                label='Development'
              />
              <FormControlLabel
                value={TargetName.Staging}
                control={<Radio />}
                label='Staging'
              />
              <FormControlLabel
                value={TargetName.Production}
                control={<Radio />}
                label='Production'
              />
            </RadioGroup>
          </FormControl>
        </form>
      </div>
    </Container>
  )
}
