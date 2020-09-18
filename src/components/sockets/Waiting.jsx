import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import * as hero from 'hero-patterns';

const BG_COLOUR = '#9c92ac';
const BG_OPACITY = '0.15';

const backgrounds = [
  hero.fallingTriangles(BG_COLOUR, BG_OPACITY),
  hero.glamorous(BG_COLOUR, BG_OPACITY),
  hero.floatingCogs(BG_COLOUR, BG_OPACITY),
  hero.squaresInSquares(BG_COLOUR, BG_OPACITY),
  hero.circlesAndSquares(BG_COLOUR, BG_OPACITY),
];

const randomBackground = () => {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

const useStyles = makeStyles(theme => ({
  bottomInfo: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.5em'
  },
  players: {
    height: 'calc(100vh - 156px)',
    borderTop: '5px solid #fc0',
    backgroundColor: '#13ce7a',
    backgroundImage: randomBackground(),
    textAlign: 'center',
    padding: '2em',
    color: '#fff',
    overflowY: 'auto',
    textShadow: '2px 2px 4px #000'
  },
  startBtn: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  playerItem: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'line-through'
    }
  }
}));

function Waiting(props) {
  const classes = useStyles();
  const { roomID, players, socket } = props;
  return (
    <>
      <Grid container alignItems="center" justify="center" direction="row" style={{ textAlign: 'center', padding: '5px' }}>
        <Grid item xs={12}>
          <Typography component="p" style={{ fontSize: '1.5em' }}>
            Join at <span style={{ fontWeight: 700 }}>play.sme.dev</span> using the game PIN:
          </Typography>
          <Typography component="p" style={{ fontWeight: 700, fontSize: '2.5em', letterSpacing: '2px' }}>
            {roomID}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.players} alignContent="flex-start">
        {players ? Object.entries(players).map(([key, player]) => (
          <Grid item xs={4} key={key} onClick={() => socket.emit('kickPlayer', key)}>
            <Typography component="p" className={classes.playerItem} style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              {player.nickname}
            </Typography>
          </Grid>
        )) : null}
      </Grid>
      <Grid container style={{ textAlign: 'center', padding: '10px', color: '#fff', background: '#1368CE' }}>
        <Grid item xs={4} className={classes.bottomInfo}>
          {`${Object.keys(players).length} players`}
        </Grid>
        <Grid item xs={4} className={classes.bottomInfo} style={{ padding: 0 }}>
          <InfoOutlined style={{ verticalAlign: 'middle', fontSize: '1.8rem' }} /> Waiting for players...
        </Grid>
        <Grid item xs={4} className={classes.bottomInfo}>
          <span className={classes.startBtn} onClick={() => socket.emit('startGame')}>Start game &raquo;</span>
        </Grid>
      </Grid>
    </>
  )
}

export default Waiting;
