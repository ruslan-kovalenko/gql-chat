import gql from 'graphql-tag';
import { baseMutation } from './utils';
import { fragments } from './fragments';

const REGISTER_USER = gql`
  mutation registerUser($user: RegisterUserInput!) {
    registerUser(user: $user) {
      ...userWithToken
    }
  }

  ${fragments.userWithToken}
`;

export const CREATE_CHAT = gql`
  mutation createChat($chatSettings: CreateChatInput!) {
    createChat(chatSettings: $chatSettings) {
      id
    }
  }
`

export const DELETE_CHAT = gql`
  mutation deleteChat($chatId: String!) {
    deleteChat(chatId: $chatId)
  }
`

export const SEND_MESSAGE = gql`
  mutation SendMessage($data: SendMessageInput!) {
    sendMessage(data: $data)
  }
`;

export const mutations = {
  registerUser: baseMutation(REGISTER_USER),
};
