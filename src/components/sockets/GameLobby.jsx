import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import icons from './lib/icons';
import colours from './lib/colours';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.4
  },
  bottomInfo: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.5em'
  }
}));

function GameLobby(props) {
  const classes = useStyles();

  const { roomID, players, question, timer, progress, numAnswered } = props;

  const calcPcAnswered = () => {
    return numAnswered && Object.keys(players).length
      ? `${Math.floor((numAnswered / Object.keys(players).length) * 100)}%`
      : '0%';
  }

  return (
    <>
      <Grid container alignItems="center" justify="center" direction="row" style={{ textAlign: 'center', padding: '5px' }}>
        <Grid item xs={12}>
          <Typography component="p">
            {progress}
          </Typography>
          <Typography component="p" style={{ fontWeight: 700, fontSize: '2em' }}>
            {question.text}
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ textAlign: 'center' }}>
        {question.choices.map((choice, index) => (
          <Grid item xs={6} key={index} className={classes.button} style={{ background: colours[index], height: question.choices.length > 2 ? 'calc(50vh - 65px)' : 'calc(100vh - 130px)' }}>
            <div style={{ flex: 'stretch', flexWrap: 'wrap' }}>
              {icons[index]}
              <Typography component="h1" variant="h5" style={{ color: '#fff', marginTop: '0.5em', fontSize: '2em' }}>
                {choice}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      <Grid container style={{ textAlign: 'center', padding: '10px' }}>
        <Grid item xs={3} className={classes.bottomInfo}>
          <span style={{ fontWeight: 700 }}>PIN:</span> {roomID}
        </Grid>
        <Grid item xs={3} className={classes.bottomInfo}>
          <span style={{ fontWeight: 700 }}>{Object.keys(players).length}</span> players
        </Grid>
        <Grid item xs={3} className={classes.bottomInfo}>
          <span style={{ fontWeight: 700 }}>{calcPcAnswered()}</span> answered
        </Grid>
        <Grid item xs={3} className={classes.bottomInfo}>
          <span style={{ fontWeight: 700 }}>{`${timer}s`}</span> remaining
        </Grid>
      </Grid>
    </>
  )
}

export default GameLobby;
