import React, { ReactElement } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  media: {
    height: 300,
  },
})

interface MapGridItemProps {
  name: string
  imageURL: string
}
export function MapGridItem({
  name,
  imageURL,
}: MapGridItemProps): ReactElement {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={6}>
      <Card>
        <CardActionArea>
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
