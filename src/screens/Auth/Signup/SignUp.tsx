import * as React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import styles from "./SignUp.style";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FormValidator } from "../../../helpers/FormValidator";
import Loading from "../../../components/Loading";

type Props = {
  navigation: {
    navigate(param: string): void;
  };
};

type STATUS_MESSAGES = "LOADING" | "FAILED" | "ERROR" | "SUCCESS" | "IDLE";

const auth = getAuth();

export default function SignUp(props: Props) {
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

      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("signin");
    } catch (error: any) {
      console.log(error);
      showMessage({
        message: error.message? error.message : "SOMETHING WENT WRONG, PLEASE TRY AGAIN",
        type: "danger",
      });
      setStateMessage("IDLE");
    }
  };

  const handleNavigation = () => {
    navigation.navigate("login");
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
                <Text style={styles.textButton}>Send</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={handleNavigation}>
                <Text style={styles.verifyCode}>Sign In?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
