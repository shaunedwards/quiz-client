import React, { useState } from 'react';
import {
  Grid,
  Link,
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(2)
  }
}));

function Login(props) {
  const { setAuthenticated } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    // send credentials to server
    fetch('http://mmp-sme4.dcs.aber.ac.uk:5000/login', { method: 'POST', body: formData, credentials: 'include' })
      .then(response => {
        if (response.ok) return setAuthenticated(true);
        document.getElementById('login-form').reset();
        document.getElementById('username').focus();
        setError('Invalid username or password specified');
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
          Sign in
        </Typography>
        <Typography component="p" variant="caption">
          Log in using your Aber credentials below
        </Typography>
        {error ? <Alert severity="error" className={classes.alert}>{error}</Alert> : null}
        <form id="login-form" className={classes.form} noValidate>
          <TextField
            required
            autoFocus
            fullWidth
            variant="outlined"
            margin="normal"
            id="username"
            label="Username"
            name="username"
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid>
            <Grid item align="center">
              <Link href="https://myaccount.aber.ac.uk/open/reset/" target="_blank" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
