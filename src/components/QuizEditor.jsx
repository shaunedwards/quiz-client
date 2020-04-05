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
import { Edit, Delete, ExpandMore } from '@material-ui/icons';
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
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/games/${match.params.id}`)
      .then(res => res.json())
      .then(data => {
        setQuiz(data);
        setPublic(data.public);
        setQuestions(data.questions);
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
      .then(response => {
        if (response.ok) setSuccess('Your changes have been saved!');
      });
  }

  const removeQuestion = (index) => {
    let arr = [...questions];
    arr.splice(index, 1);
    setQuestions(arr);
  }

  return (
    <>
      <Header
        title="Quiz Editor"
        editorMode
        onEditorClose={onClose}
        onEditorSave={onSave}
      />
      <Grid id="editor" container justify="center" style={{ padding: 30 }}>
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
              <Switch
                checked={isPublic}
                onChange={e => setPublic(e.target.checked)}
                value="public"
              />
            }
            label="Allow this game to be discovered by other teachers"
            labelPlacement="start"
          />
          <Button
            id="add-question-btn"
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            Add New Question
          </Button>
        </FormGroup>
      </Grid>
      <Grid container justify="center">
        <form style={{ width: '90vw', marginBottom: 30 }}>
          {questions
            ? questions.map((question, index) => {
              return (
                <ExpansionPanel key={index}>
                  <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <FormControlLabel
                      aria-label="Edit"
                      onClick={event => {
                        event.stopPropagation();
                        setSelected(index);
                        setDialogOpen(true);
                      }}
                      onFocus={event => event.stopPropagation()}
                      control={<Edit />}
                    />
                    <FormControlLabel
                      aria-label="Remove"
                      onClick={event => {
                        event.stopPropagation();
                        removeQuestion(index);
                      }}
                      onFocus={event => event.stopPropagation()}
                      control={<Delete />}
                    />
                    <Typography>
                      {question.text}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container>
                      <Grid item xs={12} md={5}>
                        <Typography component="p" style={{ fontWeight: 700 }}>Choices</Typography>
                        <Typography component="p">{question.choices.join(', ')}</Typography>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Typography component="p" style={{ fontWeight: 700 }}>Answer(s)</Typography>
                        <Typography component="p">
                          {question.correct_answers.length > 0 ? question.correct_answers.join(', ') : 'All answers will be marked correct'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={1}>
                        <Typography component="p" style={{ fontWeight: 700 }}>Points</Typography>
                        <Typography component="p">{question.points ? question.points : 'none'}</Typography>
                      </Grid>
                      <Grid item xs={6} md={1}>
                        <Typography component="p" style={{ fontWeight: 700 }}>Timer</Typography>
                        <Typography component="p">{question.timer ? `${question.timer}s` : 'none'}</Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })
            : null}
        </form>
      </Grid>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
      {redirect ? <Redirect to="/dashboard" /> : null}
      {isDialogOpen ? (
        <QuestionDialog
          isOpen={isDialogOpen}
          setOpen={setDialogOpen}
          questions={questions}
          setQuestions={setQuestions}
          selected={selected}
          setSelected={setSelected}
        />
      ) : null}
    </>
  );
}

export default QuizEditor;
