import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';

let socket;

function SocketDemo() {
  const [title, setTitle] = useState('');
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState({});
  const [answered, setAnswered] = useState(false);
  const [isOver, setOver] = useState(false);
  const [timer, setTimer] = useState(0);

  const match = useRouteMatch();

  useEffect(() => {
    socket = io('http://localhost:5000');
    socket.emit('room', match.params.id);
    const nick = prompt('enter nickname');
    socket.emit('nickname', nick);
    socket.emit('startGame');
  }, []);

  useEffect(() => {
    socket.on('gamestate', ({ title, players, isOver }) => {
      setTitle(title);
      setPlayers(players);
      setOver(isOver);
      console.log(title, players, isOver)
    });

    socket.on('question', (question) => {
      console.log(question);
      setQuestion(question);
      setAnswered(false);
      document.body.style = 'background: #fff';
    });

    socket.on('timer', (timeRemaining) => {
      setTimer(timeRemaining);
    });
  }, [title, question, players, timer]);

  const submitAnswer = (event) => {
    event.preventDefault();
    socket.emit('answer', event.currentTarget.value, (response) => {
      console.log(response);
      if (response) {
        document.body.style = 'background: #90ee90';
      } else {
        document.body.style = 'background: #ffcccb';
      }
    });
    setAnswered(true);
  }

  return (
    <Grid container>
      <Grid container xs={9}>
        <Grid item xs={12} style={{ padding: 30 }}>
          <Typography variant="h2">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ padding: 30 }}>
          <Typography variant="h5">
            {question ? `${question.text} (${timer}s remaining)` : null}
          </Typography>
        </Grid>
        {question.choices ? question.choices.map((choice, index) => (
          <Grid item xs={6} style={{ padding: 30 }} key={index}>
            <Button variant="contained" fullWidth onClick={submitAnswer} disabled={answered || (isOver && answered)} value={choice}>
              {choice}
            </Button>
          </Grid>
        )) : null}
        {isOver && answered ? (
          <Typography variant="h5" style={{ padding: 30 }}>
            GAME OVER!
          </Typography>
        ) : null}
      </Grid>
      <Grid container xs={3}>
        <Grid item xs={12} style={{ padding: 30 }}>
          <Typography variant="h6">
            {`Players (${Object.keys(players).length})`}
          </Typography>
          <List>
            {players ? Object.entries(players).map(([key, player]) => (
              <ListItem key={key}>
                <ListItemText
                  primary={key === socket.id ? `${player.nickname} (You)` : player.nickname}
                  secondary={player.score}
                />
              </ListItem>
            )) : null}
          </List>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SocketDemo;
