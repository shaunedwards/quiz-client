import React, { useState, useEffect } from 'react';

import Waiting from './Waiting';
import GameLobby from './GameLobby';
import CreateGame from './CreateGame';
import HostGameOver from './HostGameOver';

function HostView({ socket }) {
  const [state, setState] = useState('');
  const [gameId, setGameId] = useState('');
  const [players, setPlayers] = useState({});
  const [question, setQuestion] = useState('');
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState();
  const [numAnswered, setNumAnswered] = useState();

  useEffect(() => {
    socket.on('gamestate', ({ roomID, state, players, progress, numAnswered }) => {
      setGameId(roomID);
      setState(state);
      setPlayers(players);
      setProgress(progress);
      setNumAnswered(numAnswered);
      if (state === 'GAMEOVER') socket.off('gamestate');
    });

    socket.on('question', (question) => {
      setQuestion(question);
    });

    socket.on('timer', (timeRemaining) => {
      setTimer(timeRemaining);
    });
  }, [gameId, state, players, question, timer, progress]);

  const renderSwitch = (state) => {
    switch (state) {
      case 'LOBBY':
        return <Waiting roomID={gameId} players={players} socket={socket} />
      case 'QUESTION':
        return <GameLobby roomID={gameId} players={players} question={question} timer={timer} progress={progress} numAnswered={numAnswered} />
      case 'GAMEOVER':
        return <HostGameOver players={players} />
      default:
        return <CreateGame socket={socket} />
    }
  }

  return renderSwitch(state);
}

export default HostView;
