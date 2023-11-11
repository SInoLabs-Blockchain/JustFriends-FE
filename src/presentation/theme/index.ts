import { createTheme } from '@mui/material';
import defaultTheme from './default';

const theme = createTheme({
  ...defaultTheme,
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {},
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
});

export default theme;
