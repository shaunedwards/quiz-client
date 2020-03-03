import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Header from './Header';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://mmp-sme4.dcs.aber.ac.uk:5000/dashboard', { credentials: 'include' })
      .then(res => res.json())
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