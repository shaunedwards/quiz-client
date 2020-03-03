import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography 
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    ...theme.typography.button,
    fontSize: 17,
    color: '#fff',
    borderBottom: '2px solid #fc0',
    borderTop: '2px solid #fc0',
    padding: 2,
    textAlign: 'center'
  },
  card: props => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    width: 250,
    height: 250,
    background: `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url("${props.image}")`,
    backgroundSize: 'cover'
  })
}));

function SubjectCard(props) {
  const { id, name, image } = props;

  const classes = useStyles({ image });

  return (
    <Link to={{ pathname: `/discover/${id}`, state: props }} style={{textDecoration:'none'}}>
      <Card raised className={classes.card}>
        <CardContent>
          <Typography component="h1" variant="h6" className={classes.title}>
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default SubjectCard;