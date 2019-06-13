import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import './index.css';
import App from './App';

const client = new ApolloClient({ uri: 'http://localhost:4000' });
const theme = createMuiTheme();

ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme} >
            <App />
        </ThemeProvider>
    </ApolloProvider>, document.getElementById('root'));