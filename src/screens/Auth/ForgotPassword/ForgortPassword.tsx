import * as React from "react";
import { View, Text, TextInput } from "react-native";

import styles from "./ForgotPassword.style";
import { useNavigation } from "@react-navigation/native";

import Button from "../../../components/Button";
import Server from "../../../service/server";
import { showMessage } from "react-native-flash-message";

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation();
  const handleRequestPasswordChange = () => {
    (async () => {
      try {
        setLoading(true);
        const response = await Server.forgotPasswordRequest(email);
        if (response.data.success) {
          setLoading(false);
          navigation.navigate("update-password");
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
  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        <View>
          <View>
            <TextInput
              placeholder="Enter Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
              keyboardType="email-address"
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>
          <View>
            <Button
              onPressCallBack={handleRequestPasswordChange}
              disabled={loading}
              loading={loading}
            >
              <Text style={styles.textButton}>Request Password Change</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
