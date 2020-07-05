import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';

import { StatusBar } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar barStyle='light-content' backgroundColor='#072B4F' />
      <Routes />
    </PaperProvider>
  );
}
