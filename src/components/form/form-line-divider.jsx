import React from 'react';
import { withStyles } from '@material-ui/styles';

const defaultWidth = 30;

const styles = {
  root: {
    height: 0,
    width: props => `${props.width || defaultWidth}px`,
  },
};

const FormLineDivider = ({ classes }) => {
  return <div className={classes.root}></div>;
};

export default withStyles(styles)(FormLineDivider);
