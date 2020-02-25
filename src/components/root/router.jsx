import React from 'react';
import { Switch } from 'react-router-dom';
import { routes } from '../../constants/routes';
import PrivateRoute from '../common/private-route';
import { useSelector } from 'react-redux';
import { ChatsPage, LoginPage, SignUpPage } from '../../pages';
import ChatPage from '../../pages/chat';

const Router = () => {
  const isUserLoggedIn = useSelector(state => !!state.auth.user);

  return (
    <Switch>
      <PrivateRoute
        path={routes.signup}
        component={SignUpPage}
        isAllowed={!isUserLoggedIn}
        redirectTo={routes.chats}
      />
      <PrivateRoute
        path={routes.login}
        component={LoginPage}
        isAllowed={!isUserLoggedIn}
        redirectTo={routes.chats}
      />
      <PrivateRoute
        path={routes.chats}
        component={ChatsPage}
        isAllowed={isUserLoggedIn}
        redirectTo={routes.login}
      />
      <PrivateRoute
        path={routes.chat}
        component={ChatPage}
        isAllowed={isUserLoggedIn}
        redirectTo={routes.login}
      />
      <PrivateRoute path="*" isAllowed={false} redirectTo={routes.login} />
    </Switch>
  );
};

export default Router;
