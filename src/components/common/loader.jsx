import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Centered from './centered';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  dim: {
    background: 'rgba(0, 0, 0, .3)'
  }
})

const Loader = ({ absolute, dim, ...rest }) => {
  const classes = useStyles()

  return (
    <Centered absolute={absolute} className={dim ? classes.dim : ''}>
      <CircularProgress color="primary" {...rest} />
    </Centered>
  );
};

export default Loader;
