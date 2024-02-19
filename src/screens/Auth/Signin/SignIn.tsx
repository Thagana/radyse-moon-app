import * as React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useStoreActions } from "easy-peasy";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Service and Helpers
import Server from '../../../service/server';

import styles from "./Signin.style";

// Components
import Loading from "../../../components/Loading";

// Models
import { Model } from "../../../store/model";
import { ActivityIndicator } from "react-native-paper";


type Props = {
  navigation: {
    navigate(param: string): void;
  };
};

type STATUS_MESSAGES = "LOADING" | "FAILED" | "ERROR" | "SUCCESS" | "IDLE";

export default function SignIn(props: Props) {
  const { navigation } = props;
  const [STATE_MESSAGE, setStateMessage] =
    React.useState<STATUS_MESSAGES>("IDLE");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (val: string) => {
    setEmail(val);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  }

  const updateUser = useStoreActions<Model>((action) => action.updateUser); 
  const updateAccessToken = useStoreActions<Model>((action) => action.updateAccessToken);
  const handleAuth = async () => {
    try {
      setStateMessage('LOADING');
      const response = await Server.login(email, password);
      if (!response.data.success) {
        showMessage({
          message: response.data.message,
          type: "danger",
        })
        setStateMessage('IDLE');
      } else {
        const token = response.data.data.token;
        await AsyncStorage.setItem('token', token);
        updateUser(response.data.data.profile);
        updateAccessToken(token);
        setStateMessage('IDLE');
      }

    } catch (error) {
      console.log(error);
      showMessage({
        message: "SOMETHING WENT WRONG, PLEASE TRY AGAIN",
        type: "danger",
      });
      setStateMessage("IDLE");
    }
  };

  const handleNavigation = () => {
    navigation.navigate("signup");
  };

  return (
    <View style={styles.container}>
        <View style={styles.googleGoogleContainer}>
          <View>
            <Image
              source={require("../../../assets/ic_launch.png")}
              style={styles.Avatar}
              resizeMode="contain"
            />
          </View>
          <View>
            <View>
              <TextInput
                placeholder="Enter Email"
                value={email}
                onChangeText={handleChange}
                keyboardType="email-address"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>
            <View>
              <TextInput
                placeholder="Enter Password"
                value={password}
                secureTextEntry
                onChangeText={handlePasswordChange}
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={handleAuth}
                activeOpacity={0.7}
                style={styles.googleButton}
              >
                {STATE_MESSAGE === 'LOADING' && (
                  <ActivityIndicator size={"large"} color="#fff" />
                )}
                {STATE_MESSAGE === 'IDLE' && (
                  <Text style={styles.textButton}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={handleNavigation}>
                <Text style={styles.verifyCode}>Sign Up?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
  );
}
