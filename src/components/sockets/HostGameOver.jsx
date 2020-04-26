import React, { useLayoutEffect } from 'react';
import {
  Grid,
  Link,
  Avatar,
  Button,
  Typography,
  Container,
  CssBaseline
} from '@material-ui/core';
import confetti from 'canvas-confetti';
import { FiAward } from 'react-icons/fi';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 25,
    border: '1px solid',
    borderColor: '#ddd #ddd #ccc',
    borderRadius: '3px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

const awards = [
  '#fc0',
  '#c0c0c0',
  '#cd7f32'
];

function HostGameOver({ players }) {
  const classes = useStyles();
  useLayoutEffect(() => {
    confetti({
      spread: 180,
      particleCount: 250,
      ticks: 750,
      gravity: 0.75,
      startVelocity: 75
    })
  }, []);
  const getTopThree = () => Object.values(players).sort((a, b) => b.score - a.score).slice(0, 3);
  return (
    <Container component="main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <Typography component="p" variant="h1" style={{ textAlign: 'center' }}>
        GAME OVER!
      </Typography>
      <Grid container>
        {getTopThree().map((player, index) => (
          <Grid item xs={12} md={4} key={index}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar} style={{ background: awards[index] }}>
                <FiAward />
              </Avatar>
              <Typography component="p" style={{ fontWeight: 700, fontSize: '2em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {player.nickname}
              </Typography>
              <Typography component="p" style={{ fontSize: '1.5em' }}>
                {player.score} pts
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '1em', marginBottom: '2em' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button variant="outlined" color="primary" style={{ margin: '0 auto' }}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </Container>
  )
}

export default HostGameOver;
