import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Modal,
} from "react-native";

import { useStoreActions } from "easy-peasy";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import styles from "./Profile.style";

import Server from "../../service/server";

type Props = {
  route: () => void;
  navigation: {
    navigate(param: string): void;
  };
};

export default function ProfileStack({ route, navigation }: Props) {
  const [serverState, setServerState] = React.useState<string>("LOADING");
  const [emailNotificationModalVisible, setEmailNotificationModalVisible] =
    React.useState(false);
  const [profile, setProfile] = React.useState();

  const logOut = useStoreActions<any, any>((action) => action.logOut);

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = React.useCallback(async () => {
    try {
      setServerState("LOADING");
      const response = await Server.getProfile();
      if (response.status === 200) {
        if (response.data.data) {
          setProfile(response.data.data);
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
  const fetchSettings = React.useCallback(async () => {
    try {
      setServerState("LOADING");
      const response = await Server.getSettings();
      if (response.status === 200) {
        if (response.data.data) {
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
    fetchProfile();
  }, [fetchSettings, fetchProfile]);

  

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
      <Modal
        visible={emailNotificationModalVisible}
        onDismiss={() => {
          setEmailNotificationModalVisible(false);
        }}
      >
        <View
          style={{
            padding: 20,
            marginTop: 20,
          }}
        >
          <View style={styles.backgroundModal}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: 10,
              }}
            >
              <View>
                <Ionicons
                  name="close-outline"
                  size={30}
                  color="#000"
                  onPress={() => {
                    setEmailNotificationModalVisible(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Email Notification</Text>
              <Text style={styles.modalHeaderTextBody}>
                If you would like to receive email notifications from Radyse,
                accept the teams and you will be notified when new new articles
                and received
              </Text>
            </View>
            <View style={styles.modalControls}>
              <Text style={styles.modalTermsAndConditions}>
                Accept email notification
              </Text>
              <Switch onValueChange={(value) => {}} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
