import * as React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Platform, Alert, Switch } from "react-native";

import { useStoreActions } from "easy-peasy";

import AsyncStorage from "@react-native-async-storage/async-storage";

import CountryPicker, { CountryCode, Country } from "react-native-country-picker-modal";

import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./Profile.style";
import Server from "../../service/server";

import { registerForPushNotificationsAsync } from "../../functions/registerForPushNotifications";

import { showMessage } from "react-native-flash-message";
import { Settings } from "../../interface/Settings.interface";
import { Modal } from "react-native-paper";


export default function ProfileStack() {
  const [serverState, setServerState] = React.useState<string>("LOADING");
  const [countryCode, setCountryCode] = React.useState<CountryCode>("FR");
  const [visible, setVisible] = React.useState<boolean>(false);
  const [emailNotificationModalVisible, setEmailNotificationModalVisible] = React.useState(false);

  const [settings, setSettings] = React.useState<Settings>({
    category: "",
    email_notification: 0,
    frequency: 0,
    language: "",
    location: "ZA",
    push_enabled: 0,
    sms_notification: 0,
    web_push_notification: 0,
  });
  const logOut = useStoreActions<any, any>((action) => action.logOut);

  const handleLogOut = async () => {
    try {
      logOut();
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  const requestPushToken = () => {
    registerForPushNotificationsAsync()
      .then((token) => {})
      .catch((error) => {
        showMessage({
          message: error.message,
          type: "danger",
        });
      });
  };

  const fetchSettings = React.useCallback(async () => {
    try {
      setServerState("LOADING");
      const response = await Server.getSettings();
      if (response.status === 200) {
        if (response.data.data) {
          const { language: lng, location: loc } = response.data.data;
          setSettings(response.data.data);
          setServerState("SUCCESS");
        } else {
          setServerState("ERROR");
        }
      } else {
        setServerState("ERROR");
      }
    } catch (error) {
      console.log(error);
      setServerState("ERROR");
    }
  }, []);

  React.useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSelectFlag = (country: Country) => {
    setSettings({
      ...settings,
      location: country.cca2,
    })
  };

  const requestWebPushNotification = () => {
    if (Platform.OS === 'web') {
      // Do something
    } else {
      Alert.alert('Not supported on your platform');
    }
  }

  const requestEmailNotification = async () => {
    setEmailNotificationModalVisible(true);
  }

  const updateSettings = async () => {
    try {
      const response = await Server.updateSettings({
        ...settings,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {serverState === "LOADING" && (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {serverState === "ERROR" && (
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
      {serverState === "SUCCESS" && (
        <View style={styles.container}>
          <View style={styles.listItem}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="language" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text style={styles.listText}>
                  News Language [{settings.language}]
                </Text>
              </View>
            </View>
            <View style={styles.rowAction}></View>
          </View>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              setVisible(true);
            }}
          >
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="location-outline" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text style={styles.listText}>
                  News location
                  [<CountryPicker
                    withEmoji={false}
                    withFilter={true}
                    countryCode={settings.location}
                    visible={visible}
                    onSelect={handleSelectFlag}
                  />]
                </Text>
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
                <Text style={styles.listText}>
                  Push Enabled [{settings.push_enabled ? "Yes" : "No"}]
                </Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={requestWebPushNotification}>
            <View style={styles.rowItems}>
              <View>
                <Foundation name="web" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text style={styles.listText}>
                  Web Push Enabled [
                  {settings.web_push_notification ? "Yes" : "No"}]
                </Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={requestEmailNotification}>
            <View style={styles.rowItems}>
              <View>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color="#000"
                />
              </View>
              <View style={styles.showText}>
                <Text style={styles.listText}>
                  Email Notification [
                  {settings.email_notification ? "Yes" : "No"}]
                </Text>
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
      <Modal
        visible={emailNotificationModalVisible}
        onDismiss={() => {
          updateSettings();
          setEmailNotificationModalVisible(false);
        }}
      >
        <View style={styles.backgroundModal}>
          <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Email Notification</Text>
          <Text style={styles.modalHeaderTextBody}>You can update whether you would like to receive email notification when news articles are received on our system</Text>
          </View>
          <View style={styles.modalControls}>
            <Text>Email Notification</Text>
            <Switch 
              value={settings.email_notification ? true : false}
              thumbColor={settings.email_notification  ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={(value) => {
                setSettings({
                  ...settings,
                  email_notification: value ? 1 : 0
                })
             }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
