import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  async getItem(key: string) {
    return JSON.parse((await AsyncStorage.getItem(key)) || '');
  },
  setItem(key: string, data: any) {
    AsyncStorage.setItem(key, JSON.stringify(data));
  },
  removeItem(key: string) {
    AsyncStorage.removeItem(key);
  },
};

export default storage;