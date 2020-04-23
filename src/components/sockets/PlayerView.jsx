import React, { useState, useEffect } from 'react';
import {
  Typography,
  CircularProgress
} from '@material-ui/core';

import JoinGame from './JoinGame';
import GameOver from './GameOver';
import Question from './Question';

function PlayerView({ socket }) {
  const [state, setState] = useState('');
  const [gameId, setGameId] = useState('');
  const [players, setPlayers] = useState({});
  const [question, setQuestion] = useState('');
  const [timer, setTimer] = useState(0);
  const [numQuestions, setNumQuestions] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('gamestate', ({ roomID, state, players, numQuestions }) => {
      setGameId(roomID);
      setState(state);
      setPlayers(players);
      setNumQuestions(numQuestions);
      // stop listening for this event once game ends so leaderboard etc remains constant
      if (state === 'GAMEOVER') socket.off('gamestate');
    });

    socket.on('question', (question) => {
      setQuestion(question);
    });

    socket.on('timer', (timeRemaining) => {
      setTimer(timeRemaining);
    });

    socket.on('forceDisconnect', (message) => {
      setState('');
      setMessage(message);
    });
  }, [gameId, state, players, question, timer]);

  const renderSwitch = (state) => {
    switch (state) {
      case 'LOBBY':
        return (
          <>
            <Typography component="p" variant="h5" align="center" style={{ marginTop: '1em' }}>
              Your nickname is:
            </Typography>
            <Typography component="p" align="center">
              {players[socket.id] ? players[socket.id].nickname : null}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2em 0' }}>
              <CircularProgress size="5em" />
            </div>
            <Typography component="p" variant="h5" align="center">
              Waiting for players...
            </Typography>
          </>
        )
      case 'QUESTION':
        return <Question roomID={gameId} question={question} timer={timer} players={players} socket={socket} />
      case 'GAMEOVER':
        return <GameOver socket={socket} players={players} numQuestions={numQuestions} />
      default:
        return <JoinGame socket={socket} message={message} />
    }
  }

  return renderSwitch(state);
}

export default PlayerView;
