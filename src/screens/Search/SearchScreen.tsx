import * as React from "react";
import { SafeAreaView, TextInput, View, Text } from "react-native";
/** Component */
import { AntDesign } from "@expo/vector-icons";
/** news API */
import styles from "./Search.style";
import { match, P } from "ts-pattern";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../components/Loading";
import Article from "../../components/Articles";
import Server from "../../service/server";

type Props = {
  navigation: {
    navigate(param: string): void;
  };
};

const Search = (props: Props) => {
  const { navigation } = props;
  const [term, setterm] = React.useState("");
  const [articles, setArticle] = React.useState([]);

  const query = useQuery({
    queryKey: ["searched-articles"],
    queryFn: async () => {
      return await Server.searchNews("sport");
    },
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.unavailable}>
        {query.isFetching && (
          <View>
            <Loading />
          </View>
        )}
      </View>
      <View>{query.error && <Text>Something went wrong</Text>}</View>
      <View>{query.data && <Text>Data</Text>}</View>
    </SafeAreaView>
  );
};

export default Search;
