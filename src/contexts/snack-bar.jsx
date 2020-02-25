import React, { useState, useMemo, useCallback } from 'react';
import { createContext } from 'react';
import { getNoContextHandler } from './utils';
import { Snackbar } from '@material-ui/core';
import { CustomSnackBarContent } from '../components/common';

const { Provider, Consumer } = createContext(getNoContextHandler());

export const SnackBarProvider = ({ children }) => {
  const [state, setState] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const open = useCallback(({ message, variant = 'info' }) => {
    setState(s => ({ ...s, message, variant }));
    setIsOpen(true);
  }, []);
  const error = useCallback(data => open({ ...data, variant: 'error' }), [open]);
  const warning = useCallback(data => open({ ...data, variant: 'warning' }), [open]);
  const success = useCallback(data => open({ ...data, variant: 'success' }), [open]);

  const providedValue = useMemo(
    () => ({
      open,
      error,
      warning,
      success,
    }),
    [open, error, warning, success]
  );

  return (
    <Provider value={providedValue}>
      <>
        {children}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={isOpen}
          onClose={onClose}
          autoHideDuration={4000}
        >
          <CustomSnackBarContent
            variant={state.variant}
            message={state.message}
            onClose={onClose}
          />
        </Snackbar>
      </>
    </Provider>
  );
};

export const withSnackBar = Cmp => props => (
  <Consumer>{snackBar => <Cmp {...props} snackBar={snackBar} />}</Consumer>
);
