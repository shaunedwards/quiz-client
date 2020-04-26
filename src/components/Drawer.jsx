import React from 'react';
import {
  List,
  Link,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer
} from '@material-ui/core';
import {
  Home,
  Menu,
  Search,
  ListAlt,
  Favorite,
  ThumbUp,
  History,
  ExitToApp
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

function Drawer(props) {
  const classes = useStyles();

  const { isOpen, setOpen, handleLogout } = props;

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setOpen(open);
  };

  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      disableDiscovery={iOS}
      disableBackdropTransition={!iOS}
    >
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem button>
            <ListItemIcon><Menu /></ListItemIcon>
            <ListItemText primary="Close menu" />
          </ListItem>
          <Divider />
          <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link href="/discover" style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItem button>
              <ListItemIcon><Search /></ListItemIcon>
              <ListItemText primary="Discover" />
            </ListItem>
          </Link>
          <Link href="/dashboard/games" style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItem button>
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText primary="Your Games" />
            </ListItem>
          </Link>
          <Link href="/dashboard/favourites" style={{textDecoration: 'none', color: 'inherit'}}>
            <ListItem button>
              <ListItemIcon><Favorite /></ListItemIcon>
              <ListItemText primary="Favourites" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon><History /></ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
}

export default Drawer;
