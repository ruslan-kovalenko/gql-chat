import { withStyles } from '@material-ui/core';

const GlobalCss = withStyles({
  '@global': {
    ':root, #root, body': {
      height: '100%',
    },
  },
})(() => null);

export default GlobalCss;
