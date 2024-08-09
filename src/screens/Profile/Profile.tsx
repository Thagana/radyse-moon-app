import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

import { useStoreActions } from "easy-peasy";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import styles from "./Profile.style";

import Server from "../../service/server";

import { useQuery } from "@tanstack/react-query";

type Props = {
  route: () => void;
  navigation: {
    navigate(param: string): void;
  };
};

export default function ProfileStack({ route, navigation }: Props) {
  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await Server.getProfile();
    },
    staleTime: 5 * 1000,
  });

  console.log(data?.data);

  const logOut = useStoreActions<any, any>((action) => action.logOut);

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {(isPending || isLoading) && (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {data && (
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 20,
              }}
              source={{ uri: data.data.data.avatar }}
            />
          </View>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="information-outline" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text>{data.data.data.firstName} {data.data.data.lastName}</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="information-outline" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text>{data.data.data.email}</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={handleLogOut}>
            <View style={styles.rowItems}>
              <View>
                <Ionicons name="exit-outline" size={20} color="#000" />
              </View>
              <View style={styles.showText}>
                <Text>Log Out</Text>
              </View>
            </View>
            <View style={styles.rowAction}>
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      )}
      {error && (
        <View style={[styles.container, { alignItems: "center" }]}>
          <Text style={{ fontWeight: "bold" }}>Something went wrong</Text>
        </View>
      )}
    </>
  );
}
