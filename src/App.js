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
import YourGames from './components/YourGames';
import Favourites from './components/Favourites';
import QuizEditor from './components/QuizEditor';
import QuizOverview from './components/QuizOverview';
import DiscoverListView from './components/DiscoverListView';
import SocketDemo from './components/SocketDemo';

class PrivateRoute extends Component {
  constructor(props, context) {
      super(props, context);

      this.state = {
        user: null,
        isLoading: true
      };

      fetch(`${process.env.REACT_APP_API_URL}/session`, { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
          this.setState(() => ({ isLoading: false, user: data.user }));
        })
        .catch(() => {
          this.setState(() => ({ isLoading: false, user: false }));
        });
  }

  render() {
      return this.state.isLoading 
        ? null 
        : this.state.user 
        ? <Route 
            path={this.props.path} 
            exact={this.props.exact}
            render={() => <this.props.component user={this.state.user} />} 
          /> 
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
        <PrivateRoute exact path="/dashboard/games" component={YourGames} />
        <PrivateRoute exact path="/dashboard/favourites" component={Favourites} />
        <PrivateRoute exact path="/discover" component={Discover} />
        <PrivateRoute exact path="/discover/:id" component={DiscoverListView} />
        <PrivateRoute exact path="/quiz/:id" component={QuizOverview} />
        <PrivateRoute exact path="/quiz/:id/edit" component={QuizEditor} />
        <Route exact path="/ws-demo" component={SocketDemo} />
        <Route render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
