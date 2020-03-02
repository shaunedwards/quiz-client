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
                <IconButton edge="end" color="inherit">
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer isOpen={isDrawerOpen} setOpen={setDrawerOpen} />
      <NewQuizDialog isOpen={isDialogOpen} setOpen={setDialogOpen} />
    </div>
  );
}

export default Header;