import React, { useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { subscriptions } from '../../api/subscriptions';
import ChatsGrid from './chats-grid';
import ChatsHeader from './chats-header';
import { Container } from '@material-ui/core';
import { Spacer, Loader } from '../../components/common';
import { GET_ALL_CHATS } from '../../api/query';
import { toMoment } from '../../utils';
import { chatListTypes } from '../../store/user-data';
import { useSelector } from 'react-redux';
import ChatsList from './chats-list';

// const SEND_MESSAGE = gql`
//   mutation SendMessage($message: String!) {
//     sendMessage(message: $message)
//   }
// `;

const chatsListTypeToComponent = {
  [chatListTypes.grid]: ChatsGrid,
  [chatListTypes.list]: ChatsList,
};

const mutateChatsList = ({ prev, list }) => ({
  ...prev,
  chats: {
    ...prev.chats,
    list,
  },
});

const ChatsPage = () => {
  const { data, loading, error, subscribeToMore } = useQuery(GET_ALL_CHATS, {
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    subscribeToMore({
      document: subscriptions.chatList,
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { chatList },
          },
        }
      ) => {
        const prevChatList = prev.chats.list;
        switch (chatList.type) {
          case 'ADDED':
            return mutateChatsList({ prev, list: [...prevChatList, chatList.chat] });
          case 'DELETED':
            return mutateChatsList({
              prev,
              list: prevChatList.filter(({ id }) => id !== chatList.chatId),
            });
          default:
            return prev;
        }
      },
    });
  }, [subscribeToMore]);
  const chats = useMemo(() => {
    if (!data) return [];
    return data.chats.list.map(chat => ({
      ...chat,
      createdAt: toMoment(chat.createdAt),
    }));
  }, [data]);
  const chatListType = useSelector(state => state.userData.chatListType);
  const renderChats = useCallback(() => {
    const Component = chatsListTypeToComponent[chatListType];
    return <Component chats={chats} />;
  }, [chats, chatListType]);

  if (loading) return <Loader absolute />;
  if (error) return <span>Got an error</span>;

  return (
    <Container maxWidth="lg">
      <Spacer height={10} />
      <ChatsHeader />
      {renderChats()}
    </Container>
  );
};

export default ChatsPage;
