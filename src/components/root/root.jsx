import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { getApiClient } from '../../api';
import App from './app';
import HelmetWrapper from './helmet';
import { store, persistor } from '../../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../../constants';
import { SnackBarProvider } from '../../contexts/snack-bar';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={getApiClient()}>
        <StoreProvider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <SnackBarProvider>
                <HelmetWrapper />
                <App />
              </SnackBarProvider>
            </BrowserRouter>
          </PersistGate>
        </StoreProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default Root;
