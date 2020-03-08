import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';

import Header from './Header';
import QuizCard from './QuizCard';

function YourGames() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/games`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setQuizzes(data))
  }, []);

  return (
    <>
      <Header title="Your Games" />
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
                Your games list is empty
              </Typography>
              <Typography variant="caption">
                Use the add button in the top right corner to create your first quiz!
              </Typography>
            </div>
          )}
      </Grid>
    </>
  )
}

export default YourGames;
