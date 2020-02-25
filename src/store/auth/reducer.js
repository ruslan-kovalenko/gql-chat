import { authActionNames } from '.';

const init = {
  user: null,
  isUserLoading: true,
  token: null,
  tokenVerificationError: null,
};

export function authReducer(state = init, action) {
  switch (action.type) {
    case authActionNames.USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case authActionNames.VERIFY_USER_TOKEN:
      return {
        ...state,
        isUserLoading: true,
        tokenVerificationError: null,
      };
    case authActionNames.VERIFY_USER_TOKEN_SUCCESS:
      return {
        ...state,
        tokenVerificationError: null,
        isUserLoading: false,
        user: action.payload.user || null,
        token: action.payload.shouldResetToken ? null : state.token,
      };
    case authActionNames.VERIFY_USER_TOKEN_ERROR:
      return {
        ...state,
        tokenVerificationError: action.payload.tokenVerificationError,
        isUserLoading: false,
      };

    case authActionNames.UPDATE_USER_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
      };

    case authActionNames.LOG_OUT_USER:
      return {
        ...state,
        token: null,
        user: null,
      };

    default:
      return state;
  }
}
