import Axios from './network';

class Server {
  /**
   * Sends a POST request to '/auth/login' with the given email and password.
   *
   * @param {string} email - the user's email
   * @param {string} password - the user's password
   * @return {Promise} a Promise that resolves to the server response
   */
  static async login(email: string, password: string): Promise<any> {
    return Axios.post('/auth/login', {
      email: email,
      password: password
    });
  }

  static async verify(token: string) {
    return Axios.post('/auth/verify', {
      token: token
    })
  }

  static async register(firstName: string, lastName: string, email: string, password: string) {
    return Axios.post('/auth/register', {firstName, lastName, email, password});
  }
  static async checkToken(token: string) {
    return Axios.post('/auth/check', {token});
  }
  static async getSettings() {
    return Axios.get('/user/settings');
  }
  static async getAllNews(page = 1, size = 10) {
    return Axios.get(`/news/headlines?page=${page}&size=${size}`);
  }
  static async headlines(page = 1, size = 10) {
    return Axios.get(`/news/headlines?page=${page}&size=${size}`);
  }
  static async weatherLocation(location: {
    longitude: string;
    latitude: string;
  }) {
    const {longitude, latitude} = location;
    return Axios.post('/user/weather-location', {
      longitude: longitude,
      latitude: latitude,
    });
  }
  static async userWeatherLocation() {
    return Axios.get('/user/user_weather');
  }
  static async savePushToken(token: string, type: string) {
    return Axios.post('/user/push-token', {token, type});
  }
  static async searchNews(term: string) {
    return Axios.post('/news/search', {term});
  }

  static async createDefaultSettings(user: any) {
    return Axios.post('/user/default-settings', {user});
  }
}

export default Server;
