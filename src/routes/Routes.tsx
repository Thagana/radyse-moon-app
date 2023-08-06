import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useStoreState } from 'easy-peasy';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';

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
    <NavigationContainer linking={{
      prefixes: [prefix],
      async getInitialURL() {
        // First, you may want to do the default deep link handling
        // Check if app was opened from a deep link
        const url = await Linking.getInitialURL();

        if (url != null) {
          return url;
        }

        // Handle URL from expo push notifications
        const response = await Notifications.getLastNotificationResponseAsync();

        return response?.notification.request.content.data.url;
      },
      subscribe(listener) {
        const onReceiveURL = ({ url }: { url: string }) => listener(url);

        // Listen to incoming links from deep linking
        const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

        // Listen to expo push notifications
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
          const url = response.notification.request.content.data.url;

          // Any custom logic to see whether the URL needs to be handled
          //...

          // Let React Navigation handle the URL
          listener(url);
        });

        return () => {
          // Clean up the event listeners
          eventListenerSubscription.remove();
          subscription.remove();
        };
      },
    }}>
      {token ? <Drawer /> : <Welcome />}
    </NavigationContainer>
  );
}
