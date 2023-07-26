import * as React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useStoreActions} from 'easy-peasy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

import styles from './Profile.style';

import Server from '../../service/server';
import { registerForPushNotificationsAsync } from '../../functions/registerForPushNotifications';
import { showMessage } from 'react-native-flash-message';


export default function ProfileStack() {
  const [serverState, setServerState] = React.useState('LOADING');
  const [language, setLanguage] = React.useState('');
  const [location, setLocation] = React.useState('');

  const logOut = useStoreActions<any, any>(action => action.logOut);

  const handleLogOut = async () => {
    try {
      logOut();
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log(error);
    }
  };

  const requestPushToken = () => {
    registerForPushNotificationsAsync().then(token => {
      console.log(token);
    }).catch(error => {
      showMessage({
        message: error.message,
        type: 'danger',
      })
    });
  }

  const fetchSettings = React.useCallback(async () => {
    try {
      setServerState('LOADING');
      const response = await Server.getSettings();
      if (response.status === 200) {
        if (response.data.data) {
          const {language: lng, location: loc} = response.data.data;
          console.log(response.data.data);
          setLocation(loc);
          setLanguage(lng);
          setServerState('SUCCESS');
        } else {
          setServerState('ERROR');
        }
      } else {
        setServerState('ERROR');
      }
    } catch (error) {
      console.log(error);
      setServerState('ERROR');
    }
  }, []);

  React.useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <>
      {serverState === 'LOADING' && (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {serverState === 'ERROR' && (
        <View style={styles.container}>
          <TouchableOpacity style={styles.listItem} onPress={handleLogOut}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="exit-outline" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text>Log Out</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      )}
      {serverState === 'SUCCESS' && (
        <View style={styles.container}>
          <TouchableOpacity style={styles.listItem} onPress={() => {}}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="language" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text style={styles.listText}>News Language [{language}]</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={() => {}}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="location-outline" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text style={styles.listText}>News Location [{location}]</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={requestPushToken}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="settings-outline" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text style={styles.listText}>Push Enabled []</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={handleLogOut}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="exit-outline" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text style={styles.listText}>Log Out</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
