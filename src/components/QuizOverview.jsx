import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Button,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  CardHeader,
  CardContent
} from '@material-ui/core';
import {
  Timer,
  Person,
  School,
  Edit,
  Delete,
  Timeline,
  PlayArrow,
  Visibility,
  VisibilityOff,
  Favorite,
  FavoriteBorder,
  HighlightOff,
  RadioButtonUnchecked,
  CheckCircleOutline
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useRouteMatch, withRouter } from 'react-router-dom';

import Header from './Header';
import ConfirmDialog from './ConfirmDialog';

function QuizOverview(props) {
  const [quiz, setQuiz] = useState(null);
  const [isFavourite, setFavourite] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const match = useRouteMatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/games/${match.params.id}`)
      .then(res => res.json())
      .then(quiz => {
        setQuiz(quiz);
        setFavourite(props.user.favourites.includes(quiz._id));
      });
  }, []);

  const addFavourite = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/favourites?qid=${id}`, { method: 'POST', credentials: 'include' })
      .then(response => {
        if (response.ok) setFavourite(true);
      });
  }

  const removeFavourite = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/favourites?qid=${id}`, { method: 'DELETE', credentials: 'include' })
      .then(response => {
        if (response.ok) setFavourite(false);
      });
  }

  const calcAvgAccuracy = () => {
    const { total_hosted, total_correct, total_questions, total_players } = quiz.stats;
    return total_hosted
      ? `${Math.floor(total_correct / (total_players * total_questions) * total_hosted * 100)}% average accuracy`
      : 'No data recorded'
  }

  const getNumGamesHosted = () => {
    const { total_hosted } = quiz.stats;
    return `${total_hosted} game${total_hosted !== 1 ? 's' : ''}`
  }

  return (
    <>
      <Header title={quiz ? quiz.title : null} />
      <Grid id="quiz-overview" container>
        {quiz ? (
          <>
            <Grid item xs={12} md={6} style={{ padding: 30 }}>
              <Typography variant="h5" style={{ display: 'inline-block' }}>
                {quiz.title}
              </Typography>
              <Tooltip title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}>
                <IconButton
                  id="set-favourite-btn"
                  aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                  onClick={() => isFavourite ? removeFavourite(quiz._id) : addFavourite(quiz._id)}
                  style={{ float: 'right', padding: 0 }}
                >
                  {isFavourite ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder />}
                </IconButton>
              </Tooltip>
              <Typography component="p">
                {quiz.desc ? quiz.desc : 'This quiz has no description.'}
              </Typography>
              {quiz.draft ? (
                <Alert severity="info" style={{ marginTop: '1em' }}>
                  <span style={{ fontWeight: 700 }}>This quiz is incomplete.</span> You will not be able to host a live game until published.
                </Alert>
              ) : null}
              <Divider style={{ margin: '1em 0' }} />

              <Grid container style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontSize: 14 }}>
                <Grid item xs={12} md={6}>
                  <Person
                    style={{ verticalAlign: 'middle', marginRight: '8px' }}
                    titleAccess="Quiz author" />
                  {quiz.created_by ? quiz.created_by.uid : 'No author'}
                </Grid>
                <Grid item xs={12} md={6}>
                  <PlayArrow
                    style={{ verticalAlign: 'middle', marginRight: '8px' }}
                    titleAccess="Number of plays" />
                  {`${getNumGamesHosted()} hosted`}
                </Grid>
                <Grid item xs={12} md={6}>
                  <School
                    style={{ verticalAlign: 'middle', marginRight: '8px' }}
                    titleAccess="Quiz subject" />
                  {quiz.subject.name}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Timeline
                    style={{ verticalAlign: 'middle', marginRight: '8px' }}
                    titleAccess={`Percentage of correct answers over ${getNumGamesHosted()}`} />
                  {calcAvgAccuracy()}
                </Grid>
              </Grid>
              <Divider style={{ margin: '1em 0' }} />
              {!quiz.draft ? (
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  style={{ background: '#1DB954', color: 'white' }}
                  disabled={quiz.draft}
                  onClick={() => props.history.push({
                    pathname: '/host',
                    state: quiz
                  })}
                >
                  Host a game
                </Button>
              ) : null}
              {quiz.created_by && quiz.created_by._id === props.user._id ? (
                <>
                  <Button
                    id="delete-quiz-btn"
                    color="secondary"
                    variant="contained"
                    startIcon={<Delete />}
                    onClick={() => setDialogOpen(true)}
                    style={{ float: 'right', marginLeft: 5 }}>
                    Delete
                  </Button>
                  <Button
                    id="edit-quiz-btn"
                    color="primary"
                    variant="contained"
                    startIcon={<Edit />}
                    style={{ float: 'right' }}
                    href={`/quiz/${quiz._id}/edit`}>
                    Edit
                  </Button>
                </>
              ) : null}
            </Grid>

            <Grid item xs={12} md={6} style={{ padding: 30 }}>
              <Typography variant="h5" style={{ display: 'inline-block' }}>
                Questions ({quiz.questions.length})
              </Typography>
              <Tooltip title={showAnswers ? 'Hide answers' : 'Show answers'}>
                <IconButton
                  id="toggle-answers-btn"
                  aria-label={showAnswers ? 'Hide answers' : 'Show answers'}
                  onClick={() => setShowAnswers(!showAnswers)}
                  style={{ float: 'right', padding: 0 }}
                >
                  {showAnswers ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
              {quiz.questions.length > 0 ? quiz.questions.map((question, index) => (
                <Card key={index} style={{ margin: '10px 0' }}>
                  <div
                    style={{
                      float: 'right',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      border: '1px solid lightgrey',
                      display: 'inline-block',
                      fontSize: '12px',
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      marginTop: 10,
                      marginRight: 10
                    }}>
                    <Timer style={{ verticalAlign: 'middle', marginRight: '5px', fontSize: '15px' }} />
                    {question.timer ? `${question.timer} seconds` : 'Untimed'}
                  </div>
                  <CardHeader title={question.text} titleTypographyProps={{ variant: 'body1' }} style={{ display: 'block' }} />
                  <Divider />
                  <CardContent>
                    <Grid container style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontSize: 14 }}>
                      {question.choices ? question.choices.map((choice, index) => (
                        <Grid item xs={12} md={6} key={index}>
                          {showAnswers
                            ? question.correct_answers.length === 0 || question.correct_answers.includes(choice)
                              ? <CheckCircleOutline style={{ verticalAlign: 'middle', marginRight: '8px', color: 'green' }} fontSize="small" />
                              : <HighlightOff style={{ verticalAlign: 'middle', marginRight: '8px', color: 'red' }} fontSize="small" />
                            : <RadioButtonUnchecked style={{ verticalAlign: 'middle', marginRight: '8px' }} fontSize="small" />}
                          {choice}
                        </Grid>
                      )) : null}
                    </Grid>
                  </CardContent>
                </Card>
              )) : null}
            </Grid>
          </>
        ) : null}
      </Grid>
      <ConfirmDialog isOpen={isDialogOpen} setOpen={setDialogOpen} quizId={quiz ? quiz._id : null} />
    </>
  )
}

export default withRouter(QuizOverview);
