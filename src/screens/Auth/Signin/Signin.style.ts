import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  signContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 450,
  },
  logoContainer: {
    marginBottom: 50,
    // Add logo styles here
  },
  logo: {
    width: wp(40.8),
    height: hp(20),
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: wp(95),
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginBottom: 20,
  },
  link: {
    color: "#007bff",
    fontSize: 14,
  },
  signUp: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewPassword: {
      justifyContent: "flex-end",
      alignItems: "flex-end",
      position: "relative",
      top: -55,
      right: -130,
  }
});

export default styles;
