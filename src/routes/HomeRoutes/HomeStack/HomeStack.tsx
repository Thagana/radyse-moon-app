import * as React from "react";
import { Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../../screens/Home/Home";
import LinkView from "../../../screens/LinkView/LinkView";
import SearchScreen from "../../../screens/Search";
import ArticleDetail from "../../../screens/ArticleDetail";
import HeaderIcons from "../../../components/HeaderIcons/HeaderIcons";
import { useStoreState } from "easy-peasy";
import { Model } from "../../../store/model";
import ProfileImage from "../../../components/ProfileImage/ProfileImage";
import ProfileStack from "../ProfileStack";

/** RootHomeStack */
const RootStack = createStackNavigator();

type Props = {
  navigation: {
    navigate(param: string): void;
  };
};

export default function RootStackScreen(props: Props) {
  const user = useStoreState<Model>((state) => state.user);
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          title: "Radyse Moon",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                props.navigation.navigate("Search");
              }}
              style={{ padding: 10 }}
            >
              <AntDesign name="search1" size={24} color="black" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              style={{ padding: 10 }}
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            >
              <ProfileImage image={user?.avatar} firstName={user?.firstName} />
            </Pressable>
          ),
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
      <RootStack.Screen
        name="Profile"
        component={ProfileStack}
        options={() => ({
          title: "",
        })}
      />
    </RootStack.Navigator>
  );
}
