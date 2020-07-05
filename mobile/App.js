import React from 'react';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import { Provider as PaperProvider } from 'react-native-paper';

import { StatusBar } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <PaperProvider>
        <StatusBar barStyle='light-content' backgroundColor='#332B68' />
        <Routes />
      </PaperProvider>
    </ApplicationProvider>
  );
}
