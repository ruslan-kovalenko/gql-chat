import React, { useRef, useEffect } from 'react';
import { List } from '@material-ui/core';
import ChatMessage from './chat-message';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef();
  const classes = useStyles();
  const scrollToTheBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
      scrollToTheBottom();
  }, [messages.length]);

  return (
    <List className={classes.root}>
      {messages.map(message => (
        <ChatMessage key={`chat-message-${message.id}`} message={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </List>
  );
};

export default ChatMessages;
