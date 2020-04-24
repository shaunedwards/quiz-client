import React from 'react';
import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core';
import { Link } from 'react-router-dom';

function QuizCard(props) {
  const { quiz: { _id: id, title, desc, stats }, numQuestions } = props;

  return (
    <Link to={{ pathname: `/quiz/${id}`, state: props }} style={{ textDecoration: 'none' }}>
      <Card raised style={{ width: 250 }}>
        <CardHeader
          title={title}
          subheader={desc ? desc : 'This game has no description.'}
        />
        <Divider />
        <CardContent style={{ padding: 0 }}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={6} style={{ textAlign: 'center', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Typography variant="overline">
                <span style={{ fontWeight: 700 }}>{numQuestions}</span> questions
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <Typography variant="overline">
                <span style={{ fontWeight: 700 }}>{stats.total_hosted}</span> hosted
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  )
}

export default QuizCard;