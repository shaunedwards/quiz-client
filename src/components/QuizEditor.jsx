import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Button, 
  Switch,
  Snackbar,
  FormGroup,
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Delete, ExpandMore } from '@material-ui/icons';
import { Redirect, useRouteMatch } from 'react-router-dom';

import Header from './Header';
import QuestionDialog from './QuestionDialog';

function QuizEditor() {
  const match = useRouteMatch();

  const [quiz, setQuiz] = useState({});
  const [isPublic, setPublic] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/games/${match.params.id}`)
      .then(res => res.json())
      .then(data => {
        setQuiz(data);
        setPublic(data.public);
        setQuestions(data.questions);
        console.log(data);
      });
  }, []);

  const closeSnackbar = () => {
    setError(false);
    setSuccess(false);
  }

  const onClose = () => {
    setRedirect(true);
  }

  const validate = () => {
    if (!quiz.title.trim()) {
      setError('You must provide a title for the quiz');
      return false;
    }
    if (!questions.length && isPublic) {
      setError('You cannot publish a quiz without first adding a question!');
      return false;
    }
    return true;
  }

  const onSave = () => {
    if (!validate()) return;

    quiz.questions = questions;
    quiz.public = isPublic;
    quiz.draft = false;

    fetch(`${process.env.REACT_APP_API_URL}/games/${match.params.id}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quiz),
      credentials: 'include'
     })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSuccess('Your changes have been saved!');
      });
  }

  const removeQuestion = (index) => {
    let arr = [...questions];
    arr.splice(index, 1);
    setQuestions(arr);
  }

  return (
    <>
      <Header title="Quiz Editor" editorMode onEditorClose={onClose} onEditorSave={onSave} />
      <Grid container justify="center" style={{padding: 30}}>
        <FormGroup>
          <TextField 
            required 
            label="Quiz title"
            value={quiz.title ? quiz.title : ''}
            onChange={e => {
              quiz.title = e.target.value;
              setQuiz({ ...quiz });
            }} 
          />
          <TextField 
            label="Quiz description" 
            value={quiz.desc ? quiz.desc : ''}
            onChange={e => {
              quiz.desc = e.target.value;
              setQuiz({ ...quiz });
            }} 
          />
          <FormControlLabel
            control={
              <Switch checked={isPublic} onChange={e => setPublic(e.target.checked)} value="public" />
            }
            label="Allow this game to be discovered by other teachers"
            labelPlacement="start"
          />
          <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
            Add New Question
          </Button>
      </FormGroup>
      </Grid>
      <Grid container justify="center">
        <form style={{width:'90vw'}}>
          {questions ? questions.map((question, index) => {
            return (
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                  <FormControlLabel
                    aria-label="Remove"
                    onClick={event => {
                      event.stopPropagation();
                      removeQuestion(index);
                    }}
                    onFocus={event => event.stopPropagation()}
                    control={<Delete />}
                  />
                  <Typography>{question.text || `Question ${index + 1}`}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <TextField 
                    required
                    fullWidth
                    label="Question text" 
                    value={question.text}
                    onChange={e => {
                      questions[index].text = e.target.value;
                      setQuestions([...questions]);
                    }} 
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          }) : null}
        </form>
      </Grid>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
      { redirect ? <Redirect to="/dashboard" /> : null}
      { isDialogOpen ? <QuestionDialog isOpen={isDialogOpen} setOpen={setDialogOpen} questions={questions} setQuestions={setQuestions} /> : null}
    </>
  )
}

export default QuizEditor;
