import React, { useState, useEffect } from 'react';
import { 
  Grid,
  Typography
} from '@material-ui/core';

import Header from './Header';
import DashListItem from './DashListItem';

function Dashboard(props) {
  const [games, setGames] = useState([]);
  const [recent, setRecent] = useState([]);
  const [favourites, setFavourites] = useState([]);

  async function getUserData(endpoint) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${endpoint}?limit=5`, { credentials: 'include' });
    const data = await response.json();
    return data;
  }

  async function getRecentGames() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/games/recent`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const [games, favourites, recent] = await Promise.all([
        getUserData('games'),
        getUserData('favourites'),
        getRecentGames()
      ]);
      setGames(games);
      setRecent(recent);
      setFavourites(favourites);
    }
    fetchData();
  }, []);

  return (
    <>
      <Header title="Dashboard" />
      <Grid container alignItems="flex-start" justify="flex-end" direction="row" style={{paddingRight:30, paddingTop:25}}>
        <Typography component="p">
          Logged in as: <span style={{fontWeight:700}}>{props.user.uid}</span>
        </Typography>
      </Grid>
      <Grid container alignItems="flex-start" justify="flex-start" direction="row" style={{paddingLeft:30, paddingTop:10}}>
        <Grid item xs={12} md={4}>
          <DashListItem title="Your Games" more="/dashboard/games" data={games} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashListItem title="Your Favourites" more="/dashboard/favourites" data={favourites} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashListItem title="Recently Published" more="/discover" data={recent} />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard;
