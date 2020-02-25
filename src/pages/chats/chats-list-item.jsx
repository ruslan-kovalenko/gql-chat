import React, { useCallback } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';
import ChatMenu from './chat-menu';
import { useHistory } from 'react-router-dom';
import { getChatUrl } from '../../constants';
import cl from 'classnames';

const useStyles = makeStyles({
  withEllipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  chatNameWrap: {
    display: 'flex',
  },
  chatName: {
    display: 'inline-block',
    cursor: 'pointer',
  },
});

const ChatsListItem = ({ chat }) => {
  const {
    id,
    name,
    creator: { name: creatorName },
  } = chat;
  const classes = useStyles();
  const history = useHistory();
  const openChat = useCallback(() => {
    history.push(getChatUrl(id));
  }, [history, id]);
  const primaryText = (
    <div className={cl(classes.withEllipsis, classes.chatName)} onClick={openChat}>
      {name}
    </div>
  );

  return (
    <ListItem>
      <ListItemText
        primary={primaryText}
        primaryTypographyProps={{ className: classes.chatNameWrap, component: 'div' }}
        secondary={`Created by ${creatorName}`}
        secondaryTypographyProps={{ className: classes.withEllipsis, component: 'div' }}
      />
      <ListItemSecondaryAction>
        <ChatMenu chat={chat} iconButtonProps={{ edge: 'end' }} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ChatsListItem;
