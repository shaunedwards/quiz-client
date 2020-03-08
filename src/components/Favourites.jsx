import React, { useState, useEffect } from 'react';
import { 
  Grid,
  Typography,
  Button
} from '@material-ui/core';

import Header from './Header';
import QuizCard from './QuizCard';

function Favourites() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/favourites`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setQuizzes(data))
  }, []);

  return (
    <>
      <Header title="Favourites" />
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
                You have no favourites yet!
              </Typography>
              <Button variant="outlined" color="primary" href="/discover" style={{marginTop:10}}>
                Browse quizzes
              </Button>
            </div>
          )}
      </Grid>
    </>
  )
}

export default Favourites;
