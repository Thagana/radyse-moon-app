import * as React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import styles from "./SignUp.style";

import Loading from "../../../components/Loading";
import Server from "../../../service/server";

type Props = {
  navigation: {
    navigate(param: string): void;
  };
};

type STATUS_MESSAGES = "LOADING" | "FAILED" | "ERROR" | "SUCCESS" | "IDLE";

export default function SignUp(props: Props) {
  const { navigation } = props;
  const [STATE_MESSAGE, setStateMessage] =
    React.useState<STATUS_MESSAGES>("IDLE");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (val: string) => {
    setEmail(val);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  const handleAuth = async () => {
    try {
      setStateMessage("LOADING");
      const response = await Server.register(
        firstName,
        lastName,
        email,
        password
      );
      if (!response.data.success) {
        showMessage({
          message: response.data.message,
          type: "danger",
        });
        setStateMessage("IDLE");
      } else {
        setStateMessage("IDLE");
        navigation.navigate("verify");
      }
    } catch (error: any) {
      console.log(error);
      showMessage({
        message: error.message
          ? error.message
          : "SOMETHING WENT WRONG, PLEASE TRY AGAIN",
        type: "danger",
      });
      setStateMessage("IDLE");
    }
  };

  const handleNavigation = () => {
    navigation.navigate("signin");
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
              placeholder="First Name"
              value={firstName}
              onChangeText={handleFirstNameChange}
              keyboardType="email-address"
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>
          <View>
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={handleLastNameChange}
              keyboardType="email-address"
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>
          <View>
            <TextInput
              placeholder="Email"
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
              {STATE_MESSAGE === "LOADING" && (
                <Text style={styles.textButton}>Loading ...</Text>
              )}
              {STATE_MESSAGE === "IDLE" && (
                <Text style={styles.textButton}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={handleNavigation}>
              <Text style={styles.verifyCode}>Sign In?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
