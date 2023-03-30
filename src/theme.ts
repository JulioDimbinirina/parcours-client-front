import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#e75113',
        },
        secondary: {
            main: '#828181',
        },
        success: {
            main: '#1efa5c'
        }
    },
    typography: {
        fontFamily: [
          '"Century Gothic"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
        ].join(','),
      },
});

