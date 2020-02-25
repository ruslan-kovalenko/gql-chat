export const routes = {
  signup: '/signup',
  login: '/login',
  chats: '/chats',
  chat: '/chat/:chatId'
};

export const getChatUrl = (id) => `/chat/${id}`
