import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      color: "white",
    }
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white"
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          color: "red"
        },
      },
      defaultProps: {
        color: "secondary"
      }
    }
  },

  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: '#f44336',
    },
  },
});
export default theme
