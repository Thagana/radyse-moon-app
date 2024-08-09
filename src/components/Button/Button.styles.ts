import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#24a0ed",
    width: "100%",
    height: hp(7),
    borderRadius: wp(10),
    margin: wp(1),
  },
});

export default styles;
