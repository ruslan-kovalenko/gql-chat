import { actionPath } from '../../utils';

const get = actionPath('user-data');

export const userDataActionNames = {
  SET_CHAT_LIST_TYPE: get('SET_CHAT_LIST_TYPE'),

  RESET_STORE: get('RESET_STORE'),
};
