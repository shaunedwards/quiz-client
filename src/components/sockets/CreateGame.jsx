import React, { useState } from 'react';
import {
  Button,
  Avatar,
  Typography,
  Container,
  CssBaseline,
  Switch,
  FormGroup,
  FormControlLabel
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../Header';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  }
}));

function CreateGame({ socket }) {
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [randomNicknames, setRandomNicknames] = useState(true);
  const [streakMultiplier, setStreakMultiplier] = useState(true);

  const classes = useStyles();
  const { state } = useLocation();

  const handleCreate = () => {
    socket.emit('createGame', state, {
      shuffleQuestions,
      shuffleAnswers,
      randomNicknames,
      streakMultiplier
    });
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Settings />
          </Avatar>
          <Typography component="h1" variant="h5">
            Host a game
          </Typography>
          <div style={{ width: '100%', textAlign: 'center', marginTop: 20, background: 'rgb(232, 244, 253)', borderRadius: 5, padding: '10px' }}>
            <Typography component="p" style={{ fontWeight: 700 }}>
              {state ? state.title : 'You haven\'t selected a quiz!'}
            </Typography>
          </div>
          <form className={classes.form}>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={shuffleQuestions} onChange={() => setShuffleQuestions(!shuffleQuestions)} />}
                label="Shuffle questions"
              />
              <FormControlLabel
                control={<Switch checked={shuffleAnswers} onChange={() => setShuffleAnswers(!shuffleAnswers)} />}
                label="Shuffle answer choices"
              />
              <FormControlLabel
                control={<Switch checked={streakMultiplier} onChange={() => setStreakMultiplier(!streakMultiplier)} />}
                label="Enable streak multipliers"
              />
              <FormControlLabel
                control={<Switch checked={randomNicknames} onChange={() => setRandomNicknames(!randomNicknames)} />}
                label="Friendly nickname generator"
              />
            </FormGroup>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!state}
              onClick={handleCreate}
            >
              Create game
          </Button>
          </form>
        </div>
      </Container>
    </>
  )
}

export default CreateGame;
