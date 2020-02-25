import React from 'react';
import { makeStyles } from '@material-ui/styles';
import cl from 'classnames';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const Centered = ({ children, absolute, ...rest }) => {
  const classes = useStyles();
  return (
    <div
      {...rest}
      className={cl({
        [classes.root]: true,
        [rest.className]: true,
        [classes.absolute]: absolute,
      })}
    >
      {children}
    </div>
  );
};

export default Centered;
