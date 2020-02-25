import React from 'react';
import SignUpForm from './sign-up-form';
import { Container } from '@material-ui/core';

const SignUpPage = () => {
  return (
    <Container maxWidth="sm">
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;
