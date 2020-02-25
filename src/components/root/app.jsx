import React, { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import Router from './router';
import GlobalCss from '../common/global-css';
import { useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { Loader, VerificationFailed, Header } from '../common';
import { useActions } from '../hooks';
import { useHistory } from 'react-router-dom';
import { routes } from '../../constants';
import { pathToRegexp } from 'path-to-regexp';

const withHeaderSet = [
  routes.login,
  routes.signup,
  routes.chats,
  routes.chat,
].map(route => pathToRegexp(route));
const hasHeader = pathname => withHeaderSet.some(regExp => regExp.test(pathname));

const actions = {
  verifyUserToken: authActions.verifyUserToken,
  updateUserToken: authActions.updateUserToken,
};

const App = () => {
  const history = useHistory();
  const { verifyUserToken, updateUserToken } = useActions(actions);
  const isUserLoading = useSelector(state => state.auth.isUserLoading);
  const tokenVerificationError = useSelector(state => state.auth.tokenVerificationError);

  useEffect(() => {
    verifyUserToken();
    updateUserToken();
  }, [verifyUserToken, updateUserToken]);

  const renderAppContent = () => {
    if (!isUserLoading && tokenVerificationError) {
      return <VerificationFailed {...{ tokenVerificationError, verifyUserToken }} />;
    }
    if (isUserLoading) return <Loader />;

    const withHeader = hasHeader(history.location.pathname);
    return (
      <>
        {withHeader && <Header />}
        <Router />
      </>
    );
  };

  return (
    <>
      <CssBaseline />
      <GlobalCss />
      {renderAppContent()}
    </>
  );
};

export default App;
