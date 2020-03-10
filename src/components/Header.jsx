import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { 
  Menu, 
  AddOutlined, 
  ExitToApp,
  Close,
  Done
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from './Drawer';
import NewQuizDialog from './NewQuizDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2)
  }
}));

function Header(props) {
  const { title, editorMode, onEditorSave, onEditorClose } = props;

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, { credentials: 'include' })
      .then(() => {
        props.history.push('/login');
      });
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Open menu" aria-label="menu">
            <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
              <Menu />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {editorMode ? (
            <>
              <Tooltip title="Save changes" aria-label="save">
                <IconButton color="inherit" onClick={onEditorSave}>
                  <Done />
                </IconButton>
              </Tooltip>
              <Tooltip title="Discard changes" aria-label="cancel">
                <IconButton edge="end" color="inherit" onClick={onEditorClose}>
                  <Close />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Create new quiz" aria-label="add">
                <IconButton color="inherit" onClick={() => setDialogOpen(true)}>
                  <AddOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout" aria-label="logout">
                <IconButton edge="end" color="inherit" onClick={handleLogout}>
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
      <NewQuizDialog isOpen={isDialogOpen} setOpen={setDialogOpen} />
      <Drawer isOpen={isDrawerOpen} setOpen={setDrawerOpen} handleLogout={handleLogout} />
    </div>
  );
}

export default withRouter(Header);