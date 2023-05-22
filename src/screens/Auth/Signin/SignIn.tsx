import * as React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { signInWithEmailLink } from 'firebase/auth';
import { showMessage } from "react-native-flash-message";

import { useStoreActions } from "easy-peasy";

import styles from "./Signin.style";
import { FormValidator } from "../../../helpers/FormValidator";
import Loading from "../../../components/Loading";
import { auth } from '../../../config/firebase';
import { Model } from "../../../store/model";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      if (!FormValidator.emailValidator(email)) {
        showMessage({
          message: "Email is not valid",
          type: "danger",
        });
        return;
      }

      setStateMessage("LOADING");

      const { user } = await signInWithEmailLink(auth, email, 'https://google.com');

      const token = await user.getIdToken();

      await AsyncStorage.setItem('token', token);

      updateAccessToken(token);

      updateUser(user);

    } catch (error: any) {
      console.log(error.message);
      showMessage({
        message: error.message? error.message : "SOMETHING WENT WRONG, PLEASE TRY AGAIN",
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
      {STATE_MESSAGE === "LOADING" && <Loading />}
      {STATE_MESSAGE === "IDLE" && (
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
                <Text style={styles.textButton}>Login</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={handleNavigation}>
                <Text style={styles.verifyCode}>Sign Up?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
