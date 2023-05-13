import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text} from 'react-native';
import {
  createStore,
  StoreProvider as Provider,
  useStoreRehydrated,
} from 'easy-peasy';
import FlashMessage from 'react-native-flash-message';
import { useFonts } from 'expo-font';

import Routes from './src/routes/Routes';

import Store from './src/store/model';

type Props = Provider['props'] & {children: React.ReactNode};

const StoreProviderCasted = Provider as unknown as React.ComponentType<Props>;

const store = createStore(Store);

export const RootWrapper = () => {
  const isHydrated = useStoreRehydrated();
  const [fontsLoaded] = useFonts({
    'Raleway-Black': require('./assets/fonts/Raleway-Black.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Light': require('./assets/fonts/Raleway-Light.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Thin': require('./assets/fonts/Raleway-Thin.ttf'),
  });
  if (isHydrated) {
    return <Routes />;
  }
  return (
    <View>
      <Text>Loading ...</Text>
    </View>
  );
};

export default function App() {
  return (
    <StoreProviderCasted store={store}>
      <RootWrapper />
      <FlashMessage position="top" />
    </StoreProviderCasted>
  );
}
