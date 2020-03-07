import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Header from './Header';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`, { credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => setData(data))
  }, []);

  return (
    <>
      <Header title="Dashboard" />
      <Grid container>
        <h1>{data ? data.message : null}</h1>
      </Grid>
    </>
  )
}

export default Dashboard;