import { userDataActionNames } from '.';
import { chatListTypes } from './constants';

const init = {
  chatListType: chatListTypes.grid,
};

export const userDataReducer = (state = init, action) => {
  switch (action.type) {
    case userDataActionNames.SET_CHAT_LIST_TYPE:
      return {
        ...state,
        chatListType: action.payload.chatListType,
      };

    case userDataActionNames.RESET_STORE:
      return init;

    default:
      return state;
  }
};
