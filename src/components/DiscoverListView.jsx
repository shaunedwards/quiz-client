import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useRouteMatch, useLocation } from 'react-router-dom';

import Header from './Header';
import QuizCard from './QuizCard';

function DiscoverListView() {
  const [quizzes, setQuizzes] = useState([]);

  const match = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/subjects/${match.params.id}`)
      .then(res => res.json())
      .then(data => setQuizzes(data))
  }, []);

  return (
    <>
      <Header title={location.state.name} />
      <Grid container justify="center" style={{marginTop: 20}}>
        {quizzes.length > 0 ? quizzes.map(quiz => {
            return (
              <Grid item key={quiz._id} style={{padding: 20}}>
                <QuizCard quiz={quiz} numQuestions={quiz.questions.length} />
              </Grid>
            )
          }) : (
            <div style={{textAlign:'center'}}>
              <Typography variant="h5">
                No quizzes found
              </Typography>
              <Typography variant="caption">
                Click the + icon in the top right corner to add your own!
              </Typography>
            </div>
          )}
      </Grid>
    </>
  )
}

export default DiscoverListView;
