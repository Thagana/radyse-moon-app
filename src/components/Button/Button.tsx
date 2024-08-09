import * as React from "react";
import { TouchableOpacity } from "react-native";

import styles from "./Button.styles";
import { ActivityIndicator } from "react-native-paper";

type Props = {
  loading?: boolean;
  disabled?: boolean;
  children: JSX.Element;
  onPressCallBack: () => void;
};

export default function Button(props: Props) {
  const { children, disabled, onPressCallBack, loading } = props;
  const handlePress = () => {
    if (!disabled) {
      onPressCallBack();
    }
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handlePress}
      style={[styles.buttonStyle, disabled ? { opacity: 0.5 } : {}]}
    >
      {loading ? <ActivityIndicator /> : children}
    </TouchableOpacity>
  );
}
