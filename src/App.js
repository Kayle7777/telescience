import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Main from './pages/Main';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    typography: {
        useNextVariants: true,
    },
});

const App = props => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Main />
        </MuiThemeProvider>
    );
};

export default App;
