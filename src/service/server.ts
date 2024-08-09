import { Settings } from "../interface/Settings.interface";
import Axios from "./network";

class Server {
  static async login(email: string, password: string): Promise<any> {
    return Axios.post("/auth/login", {
      email: email,
      password: password,
    });
  }
  static async forgotPasswordRequest(email: string) {
    return Axios.post("/auth/forgot-password-request", {
      email: email,
    });
  }

  static async forgotPasswordChange(token: string, password: string) {
    return Axios.post("/auth/forgot-password", {
      token: token,
      password: password,
    });
  }

  static async getProfile() {
    return Axios.get("/profile");
  }

  static async verify(token: string) {
    return Axios.post("/auth/verify", {
      token: token,
    });
  }

  static async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    return Axios.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
  }

  static async checkToken(token: string) {
    return Axios.post("/auth/check", { token });
  }

  static async getSettings() {
    return Axios.get("/user/settings");
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
    const { longitude, latitude } = location;
    return Axios.post("/user/weather-location", {
      longitude: longitude,
      latitude: latitude,
    });
  }

  static async userWeatherLocation() {
    return Axios.get("/user/user_weather");
  }

  static async savePushToken(token: string, type: string) {
    return Axios.post("/user/push-token", { token, type });
  }

  static async searchNews(term: string) {
    return Axios.post("/news/search", { term });
  }

  static async createDefaultSettings(user: any) {
    return Axios.post("/user/default-settings", { user });
  }

  static async updateSettings(settings: Settings) {
    return Axios.post("/user/settings", { ...settings });
  }
}

export default Server;
