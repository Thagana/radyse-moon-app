import * as React from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../../../components/Button";
import Server from "../../../service/server";
import { showMessage } from "react-native-flash-message";

import styles from "./UpdatePassword.style";

export default function UpdatePassword() {
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [nextStep, setNextStep] = React.useState(false);

  const navigation = useNavigation();

  const handleContinue = () => {
    setNextStep(true);
  };

  const handlePasswordChange = () => {
    (async () => {
      try {
        setLoading(true);
        const response = await Server.forgotPasswordChange(token, password);
        if (response.data.success) {
          setLoading(false);
          navigation.navigate("signin");
        } else {
          showMessage({
            message: response.data.message,
            type: "danger",
          });
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        showMessage({
          message: "Something went wrong please try again",
          type: "danger",
        });
      }
    })();
  };
  // Enter password then enter otp
  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {!nextStep ? (
          <View>
            <View>
              <TextInput
                placeholder="Enter New Password"
                value={password}
                onChangeText={(value) => setPassword(value)}
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>
            <View>
              <Button
                onPressCallBack={handleContinue}
                disabled={loading}
                loading={loading}
              >
                <Text style={styles.textButton}>Continue</Text>
              </Button>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <TextInput
                placeholder="Enter OTP"
                value={token}
                onChangeText={(value) => setToken(value)}
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>
            <View>
              <Button
                onPressCallBack={handlePasswordChange}
                disabled={loading}
                loading={loading}
              >
                <Text style={styles.textButton}>Change Password</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
