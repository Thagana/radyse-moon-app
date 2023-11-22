import { CountryCode } from "react-native-country-picker-modal";

export interface Settings {
    category: string;
    email_notification: number;
    frequency: number;
    language: string;
    location: CountryCode;
    push_enabled: number;
    sms_notification: number;
    web_push_notification: number;
  }