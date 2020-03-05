import React, { useState } from 'react';
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
  const { isOpen, setOpen, questions, setQuestions } = props;

  const [text, setText] = useState('');
  const [timer, setTimer] = useState(0);
  const [points, setPoints] = useState(0);
  const [choices, setChoices] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!validate()) return;
    const question = {
      text,
      timer,
      points,
      type: 'multiple',
      correct_answers: answers,
      choices: choices.filter(choice => choice !== '')
    }
    setQuestions([...questions, question]);
    setOpen(false);
    console.log(question);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const validate = () => {
    if (!text.trim()) {
      setError('You must provide text for the question');
      return false;
    }
    if (!choices.length) {
      setError('You must provide at least one answer option');
      return false;
    }
    return true;
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Add New Question</DialogTitle>
        <DialogContent>
          {error ? <Alert severity="error" style={{marginBottom:'1em'}}>{error}</Alert> : null}
          <TextField
            autoFocus
            id="text"
            label="Question text"
            type="text"
            fullWidth
            required
            onChange={e => setText(e.target.value)}
          />
          <Grid container style={{fontFamily:'Roboto, Helvetica, Arial, sans-serif', fontSize:14, marginTop:20}}>
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
                <TextField placeholder={`Answer choice ${index + 1}`} onChange={e => choices[index] = e.target.value} />
              </Grid>
            ))}
          </Grid>
          <FormHelperText>You can mark one or more answers correct using the checkboxes on the left</FormHelperText>
          <Grid container style={{fontFamily:'Roboto, Helvetica, Arial, sans-serif', fontSize:14, marginTop:5}}>
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
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={30}>30s</MenuItem>
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
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuestionDialog;
