import gql from 'graphql-tag';
import { fragments } from './fragments';

const CHAT_LIST = gql`
  subscription chatList {
    chatList {
      ... on ChatListChatAdded {
        type
        chat {
          ...chatWithoutMessages
        }
      }
      ... on ChatListChatDeleted {
        type
        chatId
      }
    }
  }

  ${fragments.chatWithoutMessages}
`;

const CHAT_MESSAGES = gql`
  subscription chatMessages($chatId: String!) {
    chatMessages(chatId: $chatId) {
      ...chatMessage
    }
  }

  ${fragments.chatMessage}
`;

export const subscriptions = {
  chatList: CHAT_LIST,
  chatMessages: CHAT_MESSAGES,
};
