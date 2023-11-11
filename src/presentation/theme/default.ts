import COLOR from "./Color";

declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary'];
  }

  interface PaletteOptions {
    gray?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    gray: true;
  }
}

const defaultTheme = {
  palette: {
    gray: {
      main: COLOR.border,
    },
    primary: {
      main: COLOR.primary,
    },
  },
};

export default defaultTheme;
