import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import cl from 'classnames';

const useStyles = makeStyles(theme => ({
  submitBtn: {
    marginTop: theme.spacing(1),
  },
}));

const FormSubmitBtn = ({ submitting, children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Button
      color="primary"
      variant="contained"
      type="submit"
      disabled={submitting}
      {...rest}
      className={cl(classes.submitBtn, className)}
    >
      {children}
    </Button>
  );
};

export default FormSubmitBtn;
