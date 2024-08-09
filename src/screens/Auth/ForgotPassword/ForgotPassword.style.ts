import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderColor: "#000",
    borderWidth: wp(0.4),
    borderRadius: wp(1),
    width: wp(80),
    height: hp(8),
    padding: wp(4),
    margin: wp(1),
    color: "#000",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#24a0ed",
    width: wp(80),
    height: hp(8),
    borderRadius: wp(1),
    margin: wp(1),
  },
  textButton: {
    color: "#fff",
    fontSize: wp(4),
  },
});

export default styles;
