import { Router } from '@reach/router';
import React from 'react';
import {
  CreditsContainer,
  HomeContainer,
  NewGameContainer,
} from './containers';

export enum Routes {
  Home = '/',
  NewGame = '/play',
  Credits = '/credits',
}

function App() {
  return (
    <Router style={{ display: 'flex', height: '100vh' }}>
      <HomeContainer default path={Routes.Home} />
      <NewGameContainer path={Routes.NewGame} />
      <CreditsContainer path={Routes.Credits} />
    </Router>
  );
}

export default App;
