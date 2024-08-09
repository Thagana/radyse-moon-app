import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";

import Welcome from "./AuthRoutes/Welcome";
import Tab from "./HomeRoutes";

import { Model } from "../store/model";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./HomeRoutes/HomeStack/HomeStack";

const RootStack = createNativeStackNavigator();

export default function App() {
  const prefix = Linking.createURL("/");
  const token = useStoreState<Model>((state) => state.token);
  return (
    <NavigationContainer
      linking={{
        prefixes: [prefix],
        config: {
          screens: {
            Home: "home",
          },
        },
        async getInitialURL() {
          const url = await Linking.getInitialURL();
          if (url != null) {
            return url;
          }
          const response =
            await Notifications.getLastNotificationResponseAsync();
          return response?.notification.request.content.data.url;
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }: { url: string }) => listener(url);
          const eventListenerSubscription = Linking.addEventListener(
            "url",
            onReceiveURL
          );
          const subscription =
            Notifications.addNotificationResponseReceivedListener(
              (response) => {
                const url = response.notification.request.content.data.url;
                listener(url);
              }
            );

          return () => {
            // Clean up the event listeners
            eventListenerSubscription.remove();
            subscription.remove();
          };
        },
      }}
    >
      {token ? (
        <RootStack.Navigator>
          <RootStack.Screen
            name="Radyse Moon"
            options={{ headerShown: false }}
            component={HomeStack}
          />
        </RootStack.Navigator>
      ) : (
        <Welcome />
      )}
    </NavigationContainer>
  );
}
