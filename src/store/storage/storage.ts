import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  async getItem(key: string) {
    try {
      if (!key) return;
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value || "");
    } catch (error) {
      return null;
    }
  },
  setItem(key: string, data: any) {
    AsyncStorage.setItem(key, JSON.stringify(data));
  },
  removeItem(key: string) {
    AsyncStorage.removeItem(key);
  },
};

export default storage;
