import { userDataActionNames } from '.';

export const userDataActions = {
  setChatListType: ({ chatListType }) => ({
    type: userDataActionNames.SET_CHAT_LIST_TYPE,
    payload: { chatListType },
  }),

  resetStore: () => ({
    type: userDataActionNames.RESET_STORE,
  }),
};
