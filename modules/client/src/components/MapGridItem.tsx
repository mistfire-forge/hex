import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  media: {
    height: 300,
  },
})

interface MapGridItemProps {
  name: string
  id: number
  imageURL: string
}
export function MapGridItem({
  name,
  id,
  imageURL,
}: MapGridItemProps): ReactElement {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Grid item xs={12} sm={6}>
      <Card>
        <CardActionArea onClick={() => history.push(`/edit/${id}`)}>
          <CardMedia className={classes.media} image={imageURL} />
          <CardContent>
            <Typography gutterBottom variant='h6'>
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
