import React from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  errorMsg: {
    marginTop: theme.spacing(.75),
  },
}));

const FormError = ({ submitError }) => {
  const classes = useStyles();
  if (submitError) {
    return (
      <Typography variant="body2" color="error" className={classes.errorMsg}>
        {submitError}
      </Typography>
    );
  };
  return null;
}

export default FormError;
