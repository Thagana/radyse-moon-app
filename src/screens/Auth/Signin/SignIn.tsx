import * as React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useStoreActions } from "easy-peasy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@expo/vector-icons/Ionicons';

// Service and Helpers
import Server from "../../../service/server";

// styles
import styles from "./Signin.style";

// Models
import { Model } from "../../../store/model";

// Components
import Button from "../../../components/Button";

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
  const [viewPassword, setViewPassword] = React.useState(true); // [setViewPassword]
  const updateUser = useStoreActions<Model>((action) => action.updateUser);
  const updateAccessToken = useStoreActions<Model>(
    (action) => action.updateAccessToken,
  );

  const handleNavigate = () => {
    navigation.navigate("forgot-password");
  };

  const handleRegisterRoute = () => {
    navigation.navigate("signup");
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const handleAuth = async () => {
    try {
      setStateMessage("LOADING");
      const response = await Server.login(email, password);

      if (!response.data.success) {
        showMessage({
          message: response.data.message,
          type: "danger",
        });
        setStateMessage("IDLE");
      } else {
        const token = response.data.data.token;
        await AsyncStorage.setItem("token", token);
        updateUser(response.data.data.profile);
        updateAccessToken(token);
        setStateMessage("IDLE");
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

  const handleToggleView = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.signContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/ic_launch.png")}
            style={styles.logo}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={handleEmailChange}
          placeholder="Enter Email"
          placeholderTextColor="#777"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#777"
          onChangeText={handlePasswordChange}
          secureTextEntry={viewPassword}
          autoCapitalize="none"
        />
        <View style={styles.viewPassword}>
          <TouchableOpacity onPress={handleToggleView}>
            <Ionicons name={viewPassword ? "eye-off-outline" : "eye-outline"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPressCallBack={handleAuth}
            loading={STATE_MESSAGE === "LOADING"}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Button>
        </View>
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={handleNavigate}
        >
          <Text style={styles.link}>Forgot Password? Changed password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterRoute}>
          <Text style={styles.signUp}>Sign Up?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
