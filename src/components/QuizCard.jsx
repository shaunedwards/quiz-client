import React from 'react';
import { 
  Card, 
  Grid,
  CardHeader,
  CardContent, 
  Typography,
  Divider,
  IconButton,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Favorite } from '@material-ui/icons';

function QuizCard(props) {
  const { quiz: { _id: id, title, desc }, numQuestions } = props;

  return (
    <Link to={{ pathname: `/quiz/${id}`, state: props }} style={{textDecoration:'none'}}>
      <Card raised style={{width:250}}>
        {/* <IconButton aria-label="Add to favourites" style={{float:'right', margin:5}} onClick={e => e.preventDefault()}>
          <Favorite />
        </IconButton> */}
        <CardHeader
          title={title}
          subheader={desc ? desc : 'This game has no description.'}
        />
        <Divider />
        <CardContent style={{padding:0}}>
          <Grid container alignItems="center" justify="center">
            <Typography variant="overline">
              <span style={{fontWeight:700}}>{numQuestions}</span> questions
            </Typography>
            <Divider orientation="vertical" variant="middle" light flexItem />
            <Typography variant="overline">
              <span style={{fontWeight:700}}>100</span> plays
            </Typography>
          </Grid>
          {/* <Divider />
          <Grid container alignItems="center" justify="center">
            <Button style={{width:'100%'}} size="small">View details</Button>
          </Grid> */}
        </CardContent>
      </Card>
    </Link>
  )
}

export default QuizCard;