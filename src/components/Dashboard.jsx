import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Header from './Header';

function Dashboard() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:5000/dashboard')
  //     .then(res => res.json())
  //     .then(data => setData(data))
  // }, []);

  return (
    <>
      <Header title="Dashboard" />
      <Grid container>
        <h1>Dashboard</h1>
      </Grid>
    </>
  )
}

export default Dashboard;