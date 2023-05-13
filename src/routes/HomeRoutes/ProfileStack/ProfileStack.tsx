import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from '../../../screens/Profile';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
