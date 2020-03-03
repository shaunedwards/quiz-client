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

function QuizEditor() {
  const match = useRouteMatch();

  const [quiz, setQuiz] = useState({});
  const [isPublic, setPublic] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const update = () => {
    quiz.questions = questions;
    quiz.public = isPublic;
    quiz.draft = false;
  }

  const validate = () => {
    // TODO: add other conditions
    return !questions.some(question => question.text === '');
  }

  const onSave = async () => {
    if (!validate()) return setError('One or more required fields are incomplete');
    await update();
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

  const addQuestion = () => {
    const question = {
      type: 'multiple',
      text: '',
      choices: [],
      correct_answers: [],
      points: 0,
      timer: 0
    };
    setQuestions([...questions, question]);
  }

  const removeQuestion = (index) => {
    let arr = [...questions];
    arr.splice(index, 1);
    setQuestions(arr);
  }

  return (
    <>
      <Header title={`Editing quiz: ${quiz.title}`} editorMode onEditorClose={onClose} onEditorSave={onSave} />
      {console.log(match)}
      <Grid container justify="center" style={{padding: 30}}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={isPublic} onChange={e => setPublic(e.target.checked)} value="public" />
            }
            label="Allow this game to be discovered by other teachers"
            labelPlacement="start"
          />
          <Button variant="contained" color="primary" onClick={addQuestion}>
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
                    label="Question text" 
                    value={question.text}
                    onChange={e => {
                      questions[index].text = e.target.value;
                      setQuestions([...questions]);
                    }} 
                    style={{width:'100%'}}
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
    </>
  )
}

export default QuizEditor;
