import React from 'react';
import {
  Box,
  Tab,
  Tabs,
  AppBar,
  Typography
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import useWindowHeight from './lib/hooks/useWindowHeight';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Stats from './Stats';
import Review from './Review';
import Leaderboard from './Leaderboard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const height = useWindowHeight();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Scores" {...a11yProps(0)} />
          <Tab label="Stats" {...a11yProps(1)} />
          <Tab label="Review" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ height: `${height - 126}px` }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Leaderboard {...props} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Stats {...props} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Review {...props} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}