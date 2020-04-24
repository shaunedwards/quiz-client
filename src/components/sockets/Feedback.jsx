import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import {
  FiMeh,
  FiFrown,
  FiSmile
} from 'react-icons/fi';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    height: `${window.innerHeight - 126}px`,
    textAlign: 'center',
    overflowY: 'auto'
  },
  button: {
    fontSize: '5em',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent'
  },
  mehBtn: {
    color: '#eca82c'
  },
  smileBtn: {
    color: '#1db954'
  },
  frownBtn: {
    color: '#d4546a'
  },
});

function Feedback({ socket }) {
  const [answered, setAnswered] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    socket.emit('getFeedback', (response) => setAnswered(response));
  }, []);

  const handleFeedback = (rating) => {
    setAnswered(!answered);
    socket.emit('feedback', rating);
  }

  return (
    <div className={classes.container}>
      <Typography component="p" variant="h5" style={{ marginTop: '1em', fontWeight: 700 }}>
        {answered ? 'Thanks for your feedback!' : 'How did you find the quiz?'}
      </Typography>
      <Grid container style={{ marginTop: '1em', visibility: answered ? 'hidden' : '' }}>
        <Grid item xs={4}>
          <FiSmile className={`${classes.button} ${classes.smileBtn}`} onClick={() => handleFeedback(5)} />
        </Grid>
        <Grid item xs={4}>
          <FiMeh className={`${classes.button} ${classes.mehBtn}`} onClick={() => handleFeedback(2.5)} />
        </Grid>
        <Grid item xs={4}>
          <FiFrown className={`${classes.button} ${classes.frownBtn}`} onClick={() => handleFeedback(0)} />
        </Grid>
      </Grid>
      <Typography component="p" style={{ marginTop: answered ? '-86.4px' : '1em' }}>
        This feedback will be used by your lecturer to improve the quiz for other students.
      </Typography>
      <Typography component="p" style={{ marginTop: '1em' }}>
        All feedback is completely anonymous.
      </Typography>
    </div>
  )
}

export default Feedback;
