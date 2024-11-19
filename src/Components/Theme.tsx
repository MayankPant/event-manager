import { createTheme } from '@mui/material/styles';

// Light and Dark theme color definitions
const lightThemeColors = {
  primary: '#6aee42',  // Default light primary color for buttons
  secondary: '#b8b9b8',
  background: '#eee', // for background
  text: '#121a21',
};

const darkThemeColors = {
  primary: '#2c90e2',  // Default dark primary color for buttons
  secondary: '#253743',
  background: '#121a21', //for background
  text: '#fbffff',
  textSecondary: '#606e78'
};

// Creating the light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',  // This enables light mode
    primary: {
      main: lightThemeColors.primary,
    },
    secondary: {
      main: lightThemeColors.secondary,
    },
    background: {
      default: lightThemeColors.background,
    },
    text: {
      primary: lightThemeColors.text,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: lightThemeColors.text,  // Text color inside input fields
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: lightThemeColors.secondary,  // Outline color of text fields
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: lightThemeColors.primary,  // Hover state
          },
        '& input:-webkit-autofill': {
            '-webkit-box-shadow': `0 0 0 100px ${lightThemeColors.background} inset`,
            '-webkit-text-fill-color': `${lightThemeColors.text}`,
          },
        },
      },
    },
    MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              color: lightThemeColors.text,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: lightThemeColors.secondary,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: lightThemeColors.primary,
            },
            '& input:-webkit-autofill': {
            '-webkit-box-shadow': `0 0 0 100px ${lightThemeColors.background} inset`,
            '-webkit-text-fill-color': `${lightThemeColors.text}`,
          },
          },
        },
      },
  },
});

// Creating the dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',  // This enables dark mode
    primary: {
      main: darkThemeColors.primary,
    },
    secondary: {
      main: darkThemeColors.secondary,
    },
    background: {
      default: darkThemeColors.background,
    },
    text: {
      primary: darkThemeColors.text,
      secondary: darkThemeColors.textSecondary
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: darkThemeColors.text,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: darkThemeColors.secondary,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: darkThemeColors.primary,
          },
          '& input:-webkit-autofill': {
            '-webkit-box-shadow': `0 0 0 100px ${darkThemeColors.background} inset`,
            '-webkit-text-fill-color': `${darkThemeColors.text}`,
          },
        },
      },
    },
    MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              color: darkThemeColors.text,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: darkThemeColors.secondary,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: darkThemeColors.primary,
            },
            '& input:-webkit-autofill': {
            '-webkit-box-shadow': `0 0 0 100px ${darkThemeColors.background} inset`,
            '-webkit-text-fill-color': `${darkThemeColors.text}`,
          },
          },
        },
      },
  },
});
