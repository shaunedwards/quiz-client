import React from 'react';
import { Grid } from '@material-ui/core';

import Header from './Header';

function Dashboard(props) {
  return (
    <>
      <Header title="Dashboard" />
      <Grid container style={{paddingLeft: 30, paddingTop: 10}}>
        <h1>{`Hi, ${props.user.name}!`}</h1>
      </Grid>
    </>
  )
}

export default Dashboard;