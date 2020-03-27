import React from 'react';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

function ConfirmDialog(props) {
  const { isOpen, setOpen, quizId } = props;

  function handleDelete() {
    fetch(`${process.env.REACT_APP_API_URL}/games/${quizId}`, { method: 'DELETE', credentials: 'include' })
      .then(response => {
        if (response.ok) props.history.goBack();
      });
  }

  function handleCancel() {
    setOpen(false);
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={isOpen}
    >
      <DialogTitle>Delete Quiz</DialogTitle>
      <DialogContent dividers>
        <Typography component="p">
          Are you sure you want to delete this quiz?
        </Typography>
        <Typography component="p" style={{ fontWeight: 700, marginTop: 10 }}>
          This action cannot be reversed.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary" variant="outlined">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withRouter(ConfirmDialog);
