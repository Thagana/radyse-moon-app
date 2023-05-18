import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../../screens/Auth/Signin/SignIn';
import Verify from '../../screens/Auth/Verify';
import SignUp from '../../screens/Auth/Signup/SignUp';

/** RootHomeStack */
const RootStack = createStackNavigator();

export default function Welcome() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="signin" component={SignIn} />
      <RootStack.Screen name="signup" component={SignUp} />
    </RootStack.Navigator>
  );
}
