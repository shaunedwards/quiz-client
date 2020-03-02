import React, { useState } from 'react';
import {  
  Route, 
  Switch,
  Redirect,
  BrowserRouter
} from 'react-router-dom';

import Login from './components/Login';
import Discover from './components/Discover';
import Dashboard from './components/Dashboard';
import QuizEditor from './components/QuizEditor';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" exact>
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Login setAuthenticated={setAuthenticated} />}
        </Route>
        <Route path="/dashboard" exact>
          {/* TODO: implement dashboard - favourites, feedback, own quizzes */}
          {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/discover" exact>
          {isAuthenticated ? <Discover /> : <Redirect to="/login" />}
        </Route>
        <Route path="/discover/:id" exact>
          {/* TODO: add page for viewing quizzes under a specific category */}
        </Route>
        <Route path="/quiz/:id" exact>
          {/* TODO: add page for quiz overview - details, host a game etc */}
        </Route>
        <Route path="/quiz/:id/edit" exact>
          {isAuthenticated ? <QuizEditor /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
