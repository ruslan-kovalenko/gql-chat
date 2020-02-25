import React from 'react';
import { makeStyles } from '@material-ui/styles';
import cl from 'classnames';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const FormLine = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <div {...rest} className={cl(classes.root, className)}>
      {children}
    </div>
  );
};

export default FormLine;
