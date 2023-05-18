import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useAuth } from '../hooks/useAuthentication';

import Welcome from './AuthRoutes/Welcome';
import Drawer from './HomeRoutes';

export default function App() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <Drawer /> : <Welcome />}
    </NavigationContainer>
  );
}
