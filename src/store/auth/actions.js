import { authActionNames } from '.';

export const authActions = {
  userLoggedIn: ({ user, token }) => ({
    type: authActionNames.USER_LOGGED_IN,
    payload: { user, token },
  }),

  registerUser: ({ email, password, name }) => ({
    type: authActionNames.REGISTER_USER,
    payload: { email, password, name },
  }),
  registerUserSuccess: () => ({ type: authActionNames.REGISTER_USER_SUCCESS }),
  registerUserError: errors => ({
    type: authActionNames.REGISTER_USER_ERROR,
    payload: errors,
  }),

  logInUser: ({ email, password }) => ({
    type: authActionNames.LOG_IN_USER,
    payload: { email, password },
  }),
  logInUserSuccess: () => ({ type: authActionNames.LOG_IN_USER_SUCCESS }),
  logInUserError: errors => ({
    type: authActionNames.LOG_IN_USER_ERROR,
    payload: errors,
  }),

  verifyUserToken: () => ({ type: authActionNames.VERIFY_USER_TOKEN }),
  verifyUserTokenSuccess: ({ user, shouldResetToken = false } = {}) => ({
    type: authActionNames.VERIFY_USER_TOKEN_SUCCESS,
    payload: { user, shouldResetToken },
  }),
  verifyUserTokenError: ({ tokenVerificationError }) => ({
    type: authActionNames.VERIFY_USER_TOKEN_ERROR,
    payload: { tokenVerificationError },
  }),

  updateUserToken: () => ({ type: authActionNames.UPDATE_USER_TOKEN }),
  updateUserTokenSuccess: ({ token }) => ({
    type: authActionNames.UPDATE_USER_TOKEN_SUCCESS,
    payload: { token },
  }),

  logOutUser: () => ({ type: authActionNames.LOG_OUT_USER }),
};
