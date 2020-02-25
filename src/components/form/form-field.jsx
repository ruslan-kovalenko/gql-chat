import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    flex: 1,
    margin: '5px 0',
  },
});

const FormField = ({ input, meta, ...rest }) => {
  const { touched, error, submitError } = meta;
  const classes = useStyles();
  const errorText = error || submitError;
  const hasError = !!(touched && errorText);

  return (
    <TextField
      className={classes.root}
      helperText={hasError ? errorText : ''}
      error={hasError}
      {...input}
      {...rest}
    />
  );
};

export default FormField;
