import React, { useState } from 'react';
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
import PersonIcon from '@material-ui/icons/PersonRounded';

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

function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  const isFormValid = () => {
    if (password !== passConf) {
      setError('Your passwords do not match. Please try again.');
      return false;
    }
    return true;
  }

  const isUsernameInvalid = () => {
    return error.toLowerCase().includes('username');
  }

  const isPasswordInvalid = () => {
    return error.toLowerCase().includes('password');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) return;
    setError('');

    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      return props.history.push({
        pathname: '/login',
        state: { isRegistered: true }
      });
    }
    const { error } = await response.json();
    setError(error);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
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
                helperText={isUsernameInvalid() ? error : 'Usernames must be between 3 and 15 characters'}
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
                helperText={isPasswordInvalid() ? error : 'Passwords must be at least 8 characters'}
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
