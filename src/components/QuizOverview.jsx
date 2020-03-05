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
import { useRouteMatch } from 'react-router-dom';

import Header from './Header';

function QuizOverview() {
  const [quiz, setQuiz] = useState(null);
  const [isFavourite, setFavourite] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const match = useRouteMatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/games/${match.params.id}`)
      .then(res => res.json())
      .then(data => setQuiz(data))
  }, []);

  return (
    <>
      <Header title={quiz ? quiz.title : null} />
      <Grid container>
        {quiz ? (
          <>
            <Grid item xs={12} md={6} style={{padding:30}}>
              <Typography variant="h5" style={{display:'inline-block'}}>
                {quiz.title}
              </Typography>
              <Tooltip title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}>
                <IconButton 
                  aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'} 
                  onClick={() => setFavourite(!isFavourite)}
                  style={{float:'right', padding:0}}
                >
                  {isFavourite ? <Favorite style={{color:'red'}}/> : <FavoriteBorder />}
                </IconButton>
              </Tooltip>
              <Typography component="p">
                {quiz.desc ? quiz.desc : 'This quiz has no description.'}
              </Typography>
              <Divider style={{margin: '1em 0'}} />
          
              <Grid container style={{fontFamily:'Roboto, Helvetica, Arial, sans-serif', fontSize:14}}>
                <Grid item xs={12} md={6}>
                  <Person 
                    style={{verticalAlign:'middle', marginRight:'8px'}} 
                    titleAccess="Quiz author" /> 
                    {quiz.created_by ? quiz.created_by.uid : 'No author'}
                </Grid>
                <Grid item xs={12} md={6}>
                  <PlayArrow 
                    style={{verticalAlign:'middle', marginRight:'8px'}} 
                    titleAccess="Number of plays" /> 
                    100 games hosted
                </Grid>
                <Grid item xs={12} md={6}>
                  <School 
                    style={{verticalAlign:'middle', marginRight:'8px'}} 
                    titleAccess="Quiz subject" /> 
                    {quiz.subject.name}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Timeline 
                    style={{verticalAlign:'middle', marginRight:'8px'}} 
                    titleAccess="Percentage of correct answers over 100 games" /> 
                    90% average accuracy
                </Grid>
              </Grid>
              <Divider style={{margin: '1em 0'}} />

              <Button variant="outlined">Host a game</Button>
            </Grid>

            <Grid item xs={12} md={6} style={{padding:30}}>
              <Typography variant="h5" style={{display:'inline-block'}}>
                Questions ({quiz.questions.length})
              </Typography>
              <Tooltip title={showAnswers ? 'Hide answers' : 'Show answers'}>
                <IconButton 
                  aria-label={showAnswers ? 'Hide answers' : 'Show answers'} 
                  onClick={() => setShowAnswers(!showAnswers)}
                  style={{float:'right', padding:0}}
                >
                  {showAnswers ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
              {quiz.questions.length > 0 ? quiz.questions.map((question, index) => (
                <Card key={index} style={{margin:'10px 0'}}>
                  <div 
                    style={{
                      float:'right', 
                      padding: '2px 4px', 
                      borderRadius: '4px', 
                      border: '1px solid lightgrey', 
                      display:'inline-block', 
                      fontSize:'12px', 
                      fontFamily:'Roboto, Helvetica, Arial, sans-serif', 
                      marginTop: 10,
                      marginRight: 10
                  }}>
                    <Timer style={{verticalAlign:'middle', marginRight:'5px', fontSize:'15px'}} />
                    {question.timer ? `${question.timer} seconds` : 'Untimed'}
                  </div>
                  <CardHeader title={question.text} titleTypographyProps={{variant:'body1'}} style={{display:'block'}}/>
                  <Divider />
                  <CardContent>
                    <Grid container style={{fontFamily:'Roboto, Helvetica, Arial, sans-serif', fontSize:14}}>
                      {question.choices ? question.choices.map((choice, index) => (
                        <Grid item xs={12} md={6} key={index}>
                          {showAnswers ? 
                            question.correct_answers.length === 0 || question.correct_answers.includes(choice)
                              ? <CheckCircleOutline style={{verticalAlign:'middle', marginRight:'8px', color:'green'}} fontSize="small" />
                              : <HighlightOff style={{verticalAlign:'middle', marginRight:'8px', color:'red'}} fontSize="small" />
                              : <RadioButtonUnchecked style={{verticalAlign:'middle', marginRight:'8px'}} fontSize="small" />}
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
    </>
  )
}

export default QuizOverview;
