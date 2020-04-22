import React, { useState } from 'react';
import {
  Button,
  Avatar,
  Typography,
  Container,
  CssBaseline,
  TextField
} from '@material-ui/core';
import { School } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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

function JoinGame({ socket }) {
  const [gameId, setGameId] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  const checkGameExists = () => {
    socket.emit('playerJoin', gameId, (response) => {
      if (!response) return setError('Sorry, this game has expired');
    });
  }

  const handleChange = (e) => {
    setGameId(e.target.value.toUpperCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setGameId('');
    if (gameId.trim().length !== 6) {
      return setError('Please enter a valid game PIN');
    }
    checkGameExists();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <School />
        </Avatar>
        <Typography component="h1" variant="h5">
          Join a game
          </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Game PIN"
            variant="outlined"
            value={gameId}
            error={!!error}
            helperText={error ? error : ''}
            inputProps={{ maxLength: 6 }}
            onChange={handleChange}
            autoFocus
            fullWidth
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Join game
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default JoinGame;
