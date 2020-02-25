import React from 'react';
import { GridList, withWidth, GridListTile, makeStyles } from '@material-ui/core';
import ChatsGridItem from './chats-grid-item';

const widthToGridCols = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 5,
  xl: 5,
};

const useStyles = makeStyles({
  listTile: {
    overflow: 'visible',
  },
});

const ChatsGrid = ({ chats, width }) => {
  const classes = useStyles();

  return (
    <GridList cellHeight={150} spacing={12} cols={widthToGridCols[width]}>
      {chats.map(chat => (
        <GridListTile key={`chat-grid-${chat.id}`} classes={{ tile: classes.listTile }}>
          <ChatsGridItem chat={chat} />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default withWidth()(ChatsGrid);
