import React from 'react';
import LoginForm from './login-form';
import { Container } from '@material-ui/core';

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
