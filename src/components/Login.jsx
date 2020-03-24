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
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 120
  },
  separator: {
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  privacy: {
    fontWeight: 700,
    marginTop: 10
  }
}));

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [strategy, setStrategy] = useState('local');

  const classes = useStyles();

  const { registered } = props.location.state || {};

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    // send credentials to server
    fetch(`${process.env.REACT_APP_API_URL}/auth/${strategy}`, { method: 'POST', body: formData, credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return props.history.push('/dashboard');
        }
        document.getElementById('login-form').reset();
        document.getElementById('username').focus();
        setError('Invalid username or password specified');
      });
  }

  function resetAlerts() {
    setError('');
    props.history.replace({
      pathname: '/login',
      state: null
    });
  }

  function handleChange(event) {
    resetAlerts();
    setStrategy(event.target.value)
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
          {strategy === 'ldap' ? 'You must be connected to the university network' : null}
        </Typography>
        {error ? <Alert severity="error" className={classes.alert}>{error}</Alert> : null}
        {registered && !error ? <Alert severity="success" className={classes.alert}>Registration successful! You may now log in.</Alert> : null}
        <form id="login-form" className={classes.form} noValidate>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Authentication Method</InputLabel>
            <Select
              value={strategy}
              onChange={handleChange}
            >
              <MenuItem value="local">Use my own account (Local)</MenuItem>
              <MenuItem value="ldap">Use my Aber credentials (LDAP)</MenuItem>
            </Select>
          </FormControl>
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
              <span className={classes.separator}> | </span>
              <Link href="/register" variant="body2">
                Create an account
              </Link>
              {strategy === 'ldap' ? (
                <>
                  <Typography component="p" className={classes.privacy}>
                    Privacy Notice
                  </Typography>
                  <Typography component="p" variant="caption">
                    After logging in for the first time using the university network, 
                    we will store a copy of your user, including name and email address. 
                    Your password is not stored on the server in any way, shape or form.
                  </Typography>
                </>
              ) : null}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(Login);
