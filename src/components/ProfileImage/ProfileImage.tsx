import * as React from "react";
import { Image, View, Text } from "react-native";

import styles from "./ProfileImage.style";

type Props = {
  image: string;
  firstName: string;
};

export default function ProfileImage(props: Props) {
  const { image } = props;
  return (
    <Image
      id={`item.${image}.image`}
      source={
        image === null || image === ""
          ? require("../../assets/download.png")
          : { uri: image }
      }
      style={styles.cover}
    />
  );
}
