import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}));

const errors = {
  'PASSWORDS_NOT_MATCHING': 'Your passwords do not match. Please try again.',
  'USERNAME_INVALID_LENGTH': 'Usernames must be between 3 and 15 characters',
  'PASSWORD_INVALID_LENGTH': 'Passwords must be at least 8 characters',
  'USERNAME_ALREADY_TAKEN': 'This username is already in use. Please choose another.'
}

function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  const validate = () => {
    if (password !== passConf) {
      setError('PASSWORDS_NOT_MATCHING');
      return false;
    }
    if (username.length < 3 || username.length > 15) {
      setError('USERNAME_INVALID_LENGTH');
      return false;
    }
    if (password.length < 8) {
      setError('PASSWORD_INVALID_LENGTH');
      return false;
    }
    return true;
  }

  const isUsernameInvalid = () => {
    return error && error === 'USERNAME_INVALID_LENGTH' || error === 'USERNAME_ALREADY_TAKEN';
  }

  const isPasswordInvalid = () => {
    return error && error === 'PASSWORD_INVALID_LENGTH' || error === 'PASSWORDS_NOT_MATCHING';
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setError('');

    fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.ok) {
          return props.history.push({
            pathname: '/login',
            state: { registered: true }
          });
        }
        setError('USERNAME_ALREADY_TAKEN');
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form id="register-form" className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
                error={isUsernameInvalid()}
                helperText={isUsernameInvalid() ? errors[error] : 'Usernames must be between 3 and 15 characters'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                error={isPasswordInvalid()}
                helperText={isPasswordInvalid() ? errors[error] : 'Passwords must be at least 8 characters'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password-confirmation"
                label="Re-enter password"
                type="password"
                id="password-confirmation"
                autoComplete="current-password"
                onChange={(e) => setPassConf(e.target.value)}
                error={isPasswordInvalid()}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(Register);
