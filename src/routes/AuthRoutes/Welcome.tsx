import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../../screens/Auth/Signin/SignIn";
import Verify from "../../screens/Auth/Verify";
import SignUp from "../../screens/Auth/Signup/SignUp";

/** RootHomeStack */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../../screens/Auth/ForgotPassword";
import UpdatePassword from "../../screens/Auth/UpdatePassword/UpdatePassword";

const RootStack = createNativeStackNavigator();

export default function Welcome() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="signin" component={SignIn} />
      <RootStack.Screen name="signup" component={SignUp} />
      <RootStack.Screen name="verify" component={Verify} />
      <RootStack.Screen name="forgot-password" component={ForgotPassword} />
      <RootStack.Screen name="update-password" component={UpdatePassword} />
    </RootStack.Navigator>
  );
}
