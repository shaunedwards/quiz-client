import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TabLayout from './TabLayout';

const useStyles = makeStyles(theme => ({
  bottomInfo: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.5em',
    textAlign: 'center',
    padding: '10px',
    background: '#1368CE',
    color: '#fff'
  }
}));

function GameOver(props) {
  const classes = useStyles();
  const { socket, players } = props;
  return (
    <Grid container>
      <TabLayout {...props} />
      <Grid item xs={12} className={classes.bottomInfo}>
        <Typography component="p" style={{ textTransform: 'uppercase' }}>
          {players[socket.id] ? players[socket.id].nickname : null}
        </Typography>
        <Typography component="p" style={{ background: '#DC004E', borderRadius: '5px', width: '5em', margin: '5px auto' }}>
          {players[socket.id] ? players[socket.id].score : null}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default GameOver;
