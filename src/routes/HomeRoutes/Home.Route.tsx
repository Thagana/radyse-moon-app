import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

/** Screen */
import HomeStack from "./HomeStack/HomeStack";
import ProfileStack from "./ProfileStack";

const Drawer = createDrawerNavigator();

const TabScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Feed">
      <Drawer.Screen name="Feed" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
    </Drawer.Navigator>
  );
};

export default TabScreen;
