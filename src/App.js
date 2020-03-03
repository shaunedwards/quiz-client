import React, { Component } from 'react';
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
import DiscoverListView from './components/DiscoverListView';

class PrivateRoute extends Component {
  constructor(props, context) {
      super(props, context);

      this.state = {
        isLoading: true,
        isLoggedIn: false
      };

      fetch(`${process.env.REACT_APP_API_URL}/dashboard`, { credentials: 'include' })
        .then(response => {
          this.setState(() => ({ isLoading: false, isLoggedIn: response.ok }));
        })
        .catch(() => {
          this.setState(() => ({ isLoading: false, isLoggedIn: false }));
        });
  }

  render() {

      return this.state.isLoading 
        ? null 
        : this.state.isLoggedIn 
        ? <Route path={this.props.path} component={this.props.component} exact={this.props.exact}/> 
        : <Redirect to={{ pathname: "/login", state: { from: this.props.location } }} />

  }

}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/discover" component={Discover} />
        <PrivateRoute exact path="/discover/:id" component={DiscoverListView} />
        <PrivateRoute exact path="/quiz/:id" component={null} />
        <PrivateRoute exact path="/quiz/:id/edit" component={QuizEditor} />
        <Route render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
