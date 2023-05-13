import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useStoreActions} from 'easy-peasy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import styles from './Profile.style';
import Server from '../../service/server';

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

  const fetchSettings = React.useCallback(async () => {
    try {
      setServerState('LOADING');
      const response = await Server.getSettings();
      if (response.status === 200) {
        if (response.data.data) {
          const {language: lng, location: loc} = response.data.data;
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
        <View>
          <Text>Loading</Text>
        </View>
      )}
      {serverState === 'ERROR' && (
        <View>
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
          <TouchableOpacity style={styles.listItem} onPress={() => {}}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="settings-outline" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text style={styles.listText}>Push Enabled [True]</Text>
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
