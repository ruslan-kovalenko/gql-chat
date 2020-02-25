import gql from 'graphql-tag';

const USER_WITHOUT_PASSWORD = gql`
  fragment userWithoutPassword on UserWithoutPassword {
    id
    name
    email
  }
`;

const USER_WITH_TOKEN = gql`
  fragment userWithToken on UserWithToken {
    user {
      ...userWithoutPassword
    }
    token
  }

  ${USER_WITHOUT_PASSWORD}
`;

const CHAT_WITHOUT_MESSAGES = gql`
  fragment chatWithoutMessages on ChatRes {
    id
    name
    createdAt
    creator {
      id
      name
    }
  }
`;

const CHAT_MESSAGE = gql`
  fragment chatMessage on ChatMessage {
    id
    message
    from {
      name
    }
    createdAt
  }
`;

export const fragments = {
  userWithoutPassword: USER_WITHOUT_PASSWORD,
  userWithToken: USER_WITH_TOKEN,
  chatWithoutMessages: CHAT_WITHOUT_MESSAGES,
  chatMessage: CHAT_MESSAGE
};
