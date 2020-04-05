import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Button
} from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';

function DashListItem(props) {
  const { title, data, more } = props;
  return (
    <List style={{ marginRight: 30 }}>
      <Typography variant="h6" style={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {data && data.length > 0 ? data.map(item => (
        <ListItem divider button component="a" href={`/quiz/${item._id}`} key={item._id}>
          <ListItemText primary={item.title} />
          <ListItemIcon>
            <KeyboardArrowRight />
          </ListItemIcon>
        </ListItem>
      )) : <Typography component="p">Your list is currently empty</Typography>}
      {data && data.length === 5 ? <Button fullWidth size="small" href={more}>View more...</Button> : null}
    </List>
  )
}

export default DashListItem;