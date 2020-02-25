import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { subscriptions } from '../../api/subscriptions';
import { Container, makeStyles } from '@material-ui/core';
import { Spacer, Loader } from '../../components/common';
import { CHAT_WITH_MESSAGES } from '../../api/query';
import ChatMessages from './chat-messages';
import SendMessage from './send-message';
import { HEADER_HEIGHT } from '../../constants';
import { ApiError } from '../../models';

const TOP_SPACE = '10px';

const useStyles = makeStyles({
  root: {
    height: `calc(100% - ${HEADER_HEIGHT})`,
  },
  messagesContainer: {
    height: `calc(100% - ${TOP_SPACE})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const ChatPage = ({
  match: {
    params: { chatId },
  },
}) => {
  const classes = useStyles();
  const { data, loading, error, subscribeToMore } = useQuery(CHAT_WITH_MESSAGES, {
    variables: { chatId },
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    subscribeToMore({
      document: subscriptions.chatMessages,
      variables: { chatId },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { chatMessages },
          },
        }
      ) => {
        return {
          chats: {
            ...prev.chats,
            messages: [...prev.chats.messages, chatMessages],
          },
        };
      },
    });
  }, [subscribeToMore, chatId]);

  if (loading) return <Loader absolute />;
  if (error) return <span>{ApiError.from(error).message}</span>;

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Spacer height={TOP_SPACE} />
      <div className={classes.messagesContainer}>
        <ChatMessages messages={data.chats.messages} />
        <SendMessage chatId={chatId} />
      </div>
    </Container>
  );
};

export default ChatPage;
