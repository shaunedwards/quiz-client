import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  MenuItem,
  FormHelperText
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function QuestionDialog(props) {
  const { isOpen, setOpen, questions, setQuestions, selected, setSelected } = props;

  const [text, setText] = useState('');
  const [timer, setTimer] = useState(30);
  const [points, setPoints] = useState(1000);
  const [choices, setChoices] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selected !== null) {
      setText(questions[selected].text);
      setTimer(questions[selected].timer);
      setPoints(questions[selected].points);
      setChoices(questions[selected].choices);
      setAnswers(questions[selected].answers);
    }
  }, []);

  const resetState = () => {
    setText('');
    setTimer(0);
    setPoints(0);
    setChoices([]);
    setAnswers([]);
    setSelected(null);
  }

  const handleSubmit = () => {
    if (!validate()) return;
    const question = {
      text,
      timer,
      points,
      type: 'multiple',
      choices,
      answers
    }
    if (selected !== null) {
      const updatedQuestions = questions.map((current, index) => {
        return index === selected ? question : current;
      });
      resetState();
      setQuestions(updatedQuestions);
    } else {
      setQuestions([...questions, question]);
    }
    setOpen(false);
  }

  const handleClose = () => {
    resetState();
    setOpen(false);
  }

  const validate = () => {
    if (!text.trim()) {
      setError('You must provide text for the question');
      return false;
    }
    if (choices.length < 2) {
      setError('You must provide at least two answer options');
      return false;
    }
    return true;
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} fullWidth>
        <DialogTitle>{selected !== null ? 'Edit Question' : 'Add New Question'}</DialogTitle>
        <DialogContent id="new-question-form">
          {error ? <Alert id="question-error" severity="error" style={{ marginBottom: '1em' }}>{error}</Alert> : null}
          <TextField
            autoFocus
            id="text"
            label="Question text"
            type="text"
            fullWidth
            required
            onChange={e => setText(e.target.value)}
            value={text ? text : ''}
          />
          <Grid id="choices" container style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontSize: 14, marginTop: 20 }}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Checkbox
                  checked={answers.includes(choices[index])}
                  onChange={(_, checked) => {
                    choices[index] && choices[index].trim() && checked
                      ? setAnswers([...answers, choices[index]])
                      : setAnswers(answers.filter(answer => answer !== choices[index]))
                  }}
                />
                <TextField
                  placeholder={`Answer choice ${index + 1}`}
                  onChange={e => {
                    if (answers.length > 0 && answers.includes(choices[index])) {
                      setAnswers(answers.filter(answer => answer !== choices[index]));
                    }
                    choices[index] = e.target.value;
                    setChoices(choices.filter(choice => choice.trim() !== ''));
                  }}
                  defaultValue={choices.length > 0 ? choices[index] : ''}
                />
              </Grid>
            ))}
          </Grid>
          <FormHelperText>You can mark one or more answers correct using the checkboxes on the left</FormHelperText>
          <Grid container style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontSize: 14, marginTop: 5 }}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Timer"
                value={timer}
                margin="normal"
                variant="outlined"
                onChange={e => setTimer(e.target.value)}
              >
                <MenuItem value={10}>10s</MenuItem>
                <MenuItem value={20}>20s</MenuItem>
                <MenuItem value={30}>30s</MenuItem>
                <MenuItem value={45}>45s</MenuItem>
                <MenuItem value={60}>60s</MenuItem>
                <MenuItem value={90}>90s</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Points"
                value={points}
                margin="normal"
                variant="outlined"
                onChange={e => setPoints(e.target.value)}
              >
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
                <MenuItem value={2000}>2000</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="submit-question-btn" onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuestionDialog;
