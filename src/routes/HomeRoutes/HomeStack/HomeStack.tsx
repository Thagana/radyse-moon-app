import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../../screens/Home/Home";
import LinkView from "../../../screens/LinkView/LinkView";
import SearchScreen from "../../../screens/Search";
import ArticleDetail from "../../../screens/ArticleDetail";
import HeaderIcons from "../../../components/HeaderIcons/HeaderIcons";

/** RootHomeStack */
const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          title: "",
        })}
      />
      <RootStack.Screen
        name="LinkView"
        component={LinkView}
        options={() => ({
          title: "",
        })}
      />
      <RootStack.Screen name="Search" component={SearchScreen} />
      <RootStack.Screen
        name="ArticleDetails"
        component={ArticleDetail}
        options={({ route, navigation }: any) => ({
          title: "",
          headerRight: () => (
            <HeaderIcons params={route.params} navigation={navigation} />
          ),
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
