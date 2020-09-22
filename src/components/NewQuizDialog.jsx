import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';

function NewQuizDialog(props) {
  const { isOpen, setOpen } = props;

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/subjects`)
      .then(res => res.json())
      .then(data => setOptions(data))
  }, []);

  const handleSubmit = () => {
    const body = new URLSearchParams();
    body.append('title', title);
    body.append('subject', subject);

    fetch(`${process.env.REACT_APP_API_URL}/games`, { method: 'POST', body, credentials: 'include' })
      .then(res => res.json())
      .then(quiz => {
        setOpen(false);
        props.history.push(`/quiz/${quiz._id}/edit`);
      });
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (e) => {
    setSubject(e.target.value);
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Quiz</DialogTitle>
        <DialogContent>
          <Alert severity="info" style={{ marginBottom: '1em' }}>
            Before adding questions, please provide a quiz title and select a related subject to help others find your quiz.
          </Alert>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Quiz title"
            type="text"
            fullWidth
            required
            inputProps={{ maxLength: 50 }}
            onChange={e => setTitle(e.target.value)}
          />
          <FormControl style={{ width: '100%' }} required>
            <InputLabel>Choose a subject...</InputLabel>
            <Select
              id="subject"
              value={subject}
              onChange={handleChange}
              required
            >
              {options ? options.map(option => <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>) : null}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="submit-quiz-btn" onClick={handleSubmit} color="primary" disabled={!subject || !title.trim()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(NewQuizDialog);
