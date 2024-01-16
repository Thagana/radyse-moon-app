import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

/** Screen */
import HomeStack from "./HomeStack/HomeStack";
import ProfileStack from "./ProfileStack";

const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator 
        initialRouteName="Feed"
        >
      <Tab.Screen
        name="Feed"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="feed" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;
