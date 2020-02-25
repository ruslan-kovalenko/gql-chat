import gql from 'graphql-tag';
import { baseNoCacheQuery } from './utils';
import { fragments } from './fragments';

const LOGIN_USER = gql`
  query LoginUser($credentials: Credentials!) {
    loginUser(credentials: $credentials) {
      ...userWithToken
    }
  }

  ${fragments.userWithToken}
`;

const VERIFY_USER_TOKEN = gql`
  query VerifyUserToken($token: String!) {
    verifyUser(token: $token) {
      user {
        ...userWithoutPassword
      }
    }
  }

  ${fragments.userWithoutPassword}
`;

const UPDATE_USER_TOKEN = gql`
  query UpdateUserToken($token: String!) {
    updateUserToken(token: $token) {
      token
    }
  }
`;

export const GET_ALL_CHATS = gql`
  query GetAllChats {
    chats {
      ... on ChatsRes {
        list {
          ...chatWithoutMessages
        }
      }
    }
  }

  ${fragments.chatWithoutMessages}
`;

export const CHAT_WITH_MESSAGES = gql`
  query GetChatWithMesages($chatId: String!) {
    chats(chatId: $chatId) {
      ... on ChatRes {
        name
        messages {
          ...chatMessage
        }
      }
    }
  }

  ${fragments.chatMessage}
`;

export const query = {
  loginUser: baseNoCacheQuery(LOGIN_USER),
  verifyUser: baseNoCacheQuery(VERIFY_USER_TOKEN),
  updateUserToken: baseNoCacheQuery(UPDATE_USER_TOKEN),
};
