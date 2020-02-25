import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Centered } from '.';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    flexDirection: 'column',
  },
  button: {
    marginTop: '5px',
  },
});

const VerificationFailed = ({ tokenVerificationError, verifyUserToken }) => {
  const classes = useStyles();
  return (
    <Centered className={classes.root}>
      <Typography variant="h6">Unable to connect to the remote server</Typography>
      <Typography>{tokenVerificationError.message}</Typography>
      <Button variant="contained" onClick={verifyUserToken} className={classes.button}>
        Try again
      </Button>
    </Centered>
  );
};

export default VerificationFailed;
