import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { LocalOffer } from '@material-ui/icons';
import './App.css';
import CategoryTable from './components/CategoryTable';


const TopContainer = styled(Container)({
  margin: 0,
  padding: 0,
})

const LargeAppBar = styled(AppBar)({
  paddingBottom: '100px',
})


function App() {
  return (
    <TopContainer maxWidth={false} className="App">
      <LargeAppBar position="static">
        <Toolbar>
          <LocalOffer />
          <Typography variant="h6">
            &nbsp;Kewl Tag Manager
          </Typography>
        </Toolbar>
      </LargeAppBar>
      <Container maxWidth="lg">
        <CategoryTable />
      </Container>
    </TopContainer>
  );
}

export default App;
