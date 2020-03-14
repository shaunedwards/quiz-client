import React, { useState, useEffect } from 'react';
import { 
  Grid,
  Typography
} from '@material-ui/core';

import Header from './Header';
import DashListItem from './DashListItem';

function Dashboard(props) {
  const [games, setGames] = useState([]);
  const [favourites, setFavourites] = useState([]);

  async function getUserData(endpoint) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${endpoint}`, { credentials: 'include' });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const [games, favourites] = await Promise.all([
        getUserData('games'),
        getUserData('favourites')
      ]);
      setGames(games);
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
          <DashListItem title="Recently Published" more="/discover" data={null} />
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard;
