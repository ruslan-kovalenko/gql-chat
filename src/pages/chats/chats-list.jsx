import React, { Fragment } from 'react';
import { List } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ChatsListItem from './chats-list-item';

const ChatsList = ({ chats }) => {
  return (
    <List>
      {chats.map((chat, i) => (
        <Fragment key={`chat-list-${chat.id}`}>
          <ChatsListItem chat={chat} />
          {i !== chats.length - 1 && <Divider light />}
        </Fragment>
      ))}
    </List>
  );
};

export default ChatsList;
