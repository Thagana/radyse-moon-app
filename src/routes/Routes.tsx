import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useStoreState } from 'easy-peasy';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');
import Welcome from './AuthRoutes/Welcome';
import Drawer from './HomeRoutes';

import { Model } from '../store/model';

export default function App() {
  const token = useStoreState<Model>((state) => state.token);
  const linking = {
    prefixes: [prefix],
  };
  return (
    <NavigationContainer linking={linking}>
      {token ? <Drawer /> : <Welcome />}
    </NavigationContainer>
  );
}
