import "react-native-gesture-handler";
import * as React from "react";
import { Platform } from "react-native";
import { createStore, persist, StoreProvider as Provider } from "easy-peasy";
import FlashMessage from "react-native-flash-message";
import { useFonts } from "expo-font";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Routes from "./src/routes/Routes";

import Store from "./src/store/model";
import storage from "./src/store/storage/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = Provider["props"] & { children: React.ReactNode };

const StoreProviderCasted = Provider as unknown as React.ComponentType<Props>;

const store = createStore(persist(Store, { storage: storage }));

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  try {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "85a5e1c1-98e4-406c-a93c-cf632d5652d7",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  } catch (error) {
    console.log(error);
  }
}

const queryClient = new QueryClient();

export default function App() {
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  const [fontsLoaded] = useFonts({
    "Raleway-Black": require("./assets/fonts/Raleway-Black.ttf"),
    "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Light": require("./assets/fonts/Raleway-Light.ttf"),
    "Raleway-Medium": require("./assets/fonts/Raleway-Medium.ttf"),
    "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("./assets/fonts/Raleway-SemiBold.ttf"),
    "Raleway-Thin": require("./assets/fonts/Raleway-Thin.ttf"),
  });

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        await AsyncStorage.setItem("pushToken", token);
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Listen for notification:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Listen for notification:", response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProviderCasted store={store}>
        <Routes />
        <FlashMessage position="top" />
      </StoreProviderCasted>
    </QueryClientProvider>
  );
}
