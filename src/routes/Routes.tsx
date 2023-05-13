import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useStoreState} from 'easy-peasy';

import Welcome from './AuthRoutes/Welcome';
import Drawer from './HomeRoutes';

export default function App() {
  const isAuth = useStoreState<any>(state => state.isAuth);

  React.useEffect(() => {

  }, []);

  return (
    <NavigationContainer>
      {isAuth ? <Drawer /> : <Welcome />}
    </NavigationContainer>
  );
}
