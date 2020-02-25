import { createMuiTheme } from '@material-ui/core';

export const HEADER_HEIGHT = '58px'

export const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        height: HEADER_HEIGHT,
      },
    },
  },
  palette: {
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#d500f9',
    },
    error: {
      main: '#e6291c'
    }
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});
