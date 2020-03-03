import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Header from './Header';
import SubjectCard from './SubjectCard';

function Discover() {
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/subjects`)
      .then(res => res.json())
      .then(data => setSubjects(data))
  }, []);

  return (
    <>
      <Header title="Browse quizzes" />
      <Grid container justify="center" style={{marginTop: 20}}>
        {subjects ? subjects.map(subject => {
            return (
              <Grid item key={subject._id} style={{padding: 20}}>
                <SubjectCard id={subject._id} name={subject.name} image={subject.background_image} />
              </Grid>
            )
          }) : null}
      </Grid>
    </>
  )
}

export default Discover;
