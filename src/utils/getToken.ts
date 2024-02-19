import AsyncStorage from "@react-native-async-storage/async-storage";

export default function getFCMToken() {
  return new Promise<string>((resolve, reject) => {
    AsyncStorage.getItem("pushToken")
      .then((token) => {
        if (token) {
          resolve(token)
        } else {
          resolve('')
        }
      })
      .catch((error) => console.error(error));
  });
}
