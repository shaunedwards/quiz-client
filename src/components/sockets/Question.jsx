import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';
import icons from './lib/icons';
import colours from './lib/colours';
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircle, Cancel } from '@material-ui/icons';

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
  selected: {
    opacity: '1'
  },
  bottomInfo: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.5em',
    textAlign: 'center',
    padding: '10px',
    background: '#1368CE',
    color: '#fff'
  },
  icon: {
    color: '#fff',
    padding: '10px',
    width: '25px',
    height: '25px',
    position: 'absolute',
    right: '0',
    top: '0'
  }
}));


function Question(props) {
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);

  const classes = useStyles();

  const { question, timer, players, socket } = props;

  useEffect(() => {
    setAnswered(false);
    setSelected(null);
    setCorrect(null);
  }, [question]);

  const handleAnswer = (choice, selectedIdx) => (event) => {
    setAnswered(true);
    setSelected(selectedIdx);
    event.preventDefault();
    socket.emit('answer', choice, (response) => {
      setCorrect(response);
    });
  }

  return (
    <>
      <LinearProgress variant="determinate" value={(timer / 30) * 100} style={{ height: '20px' }} />
      <Grid container>
        {question.choices.map((choice, index) => (
          <Grid
            item
            xs={6}
            key={index}
            onClick={handleAnswer(choice, index)}
            className={`${classes.button} ${answered ? classes.disabled : ''} ${index === selected ? classes.selected : ''}`}
            style={{
              background: colours[index],
              height: question.choices.length > 2 ? 'calc(50vh - 49px)' : 'calc(100vh - 98px)',
              position: 'relative'
            }}>
            {icons[index]}
            {index === selected
              ? correct
                ? <CheckCircle className={classes.icon} />
                : <Cancel className={classes.icon} />
              : null}
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} className={classes.bottomInfo}>
        <Typography component="p" style={{ textTransform: 'uppercase' }}>
          {players[socket.id] ? players[socket.id].nickname : null}
        </Typography>
        <Typography id="score" component="p" style={{ background: '#DC004E', borderRadius: '5px', width: '5em', margin: '5px auto' }}>
          {players[socket.id] ? players[socket.id].score : null}
        </Typography>
      </Grid>
    </>
  )
}

export default Question;
