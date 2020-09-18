import React from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';
import {
  Cancel,
  CheckCircle,
  HighlightOff,
  CheckCircleOutline
} from '@material-ui/icons';

function Review({ socket, players }) {
  return (
    <Grid container style={{ overflowY: 'auto', padding: '1em' }}>
      {players[socket.id].answerHistory.map(({ question, answer, isCorrect }, index) => (
        <Grid item xs={12} key={index} style={{ paddingTop: index > 0 ? '1em' : '' }}>
          <Card style={{ width: '100%' }}>
            <div style={{ position: 'relative' }}>
              {isCorrect
                ? <CheckCircle style={{ position: 'absolute', top: 0, right: 0, padding: '10px', width: '25px', height: '25px', color: 'green' }} />
                : <Cancel style={{ position: 'absolute', top: 0, right: 0, padding: '10px', width: '25px', height: '25px', color: 'red' }} />}
            </div>
            <CardHeader title={question.text} titleTypographyProps={{ variant: 'body1' }} style={{ display: 'block', marginRight: '25px' }} />
            <Divider />
            <CardContent>
              <Grid container style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontSize: 14 }}>
                {question.choices ? question.choices.map((choice, index) => (
                  <Grid item xs={12} md={3} key={index} style={{ fontWeight: choice === answer ? 700 : '' }}>
                    {!question.answers.length || question.answers.includes(choice)
                      ? <CheckCircleOutline style={{ verticalAlign: 'middle', marginRight: '8px', color: 'green' }} fontSize="small" />
                      : <HighlightOff style={{ verticalAlign: 'middle', marginRight: '8px', color: 'red' }} fontSize="small" />}
                    {choice}
                  </Grid>
                )) : null}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Review;
