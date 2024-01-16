import * as React from "react";
import { View, Image , Text, TouchableOpacity, Pressable } from "react-native";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import BottomSheet from '@gorhom/bottom-sheet';

import ImageView from "../ImageView";

import styles from "./Article.style";
import truckAuthor from "../../functions/truckAuthor";

type Props = {
  item: {
    urlToImage: string;
    title: string;
    source: string;
    publishedAt: string;
    description: string;
    url: string;
    author: string;
  };
  isDownload: boolean;
  navigation: {
    navigate(param: string, payload: any): void;
  };
  handlePresentModalPress(): void
};

const Article = (props: Props) => {
  const { item, navigation, handlePresentModalPress } = props;
  const { urlToImage, title, source, publishedAt, description, url, author } =
    item;

  const [thumb, setThumb] = React.useState("https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4");

  const fetchThumb = React.useCallback(async () => {
    try {
      const response = await fetch(
        `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
      );
      const imageBlob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        setThumb(base64data as string);
      };
    } catch (error) {
      console.error(error);
    }
  }, [url]);


  const handleNavigate = () => {
    navigation.navigate("ArticleDetails", {
      urlToImage,
      title,
      source,
      publishedAt,
      description,
      url,
    });
  };

  React.useEffect(() => {
    fetchThumb();
  }, [fetchThumb]);

  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigate}>
      <View style={styles.content}>
        <View style={styles.contentTextContainer}>
          <View style={styles.sourceHeader}>
            <Image source={{ uri: thumb }} style={styles.thumb} />
            <Text style={styles.sourceText} lineBreakMode="tail">
              {source}
            </Text>
          </View>
          <View style={styles.spacer} />
          <Text style={styles.headerText} lineBreakMode="tail">
            {title}
          </Text>
        </View>
        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.authorText}>{truckAuthor(author)}</Text>
          </View>
          <View>
            <Text style={styles.pipe}>
              <Entypo name="dot-single" size={24} color="black" />
            </Text>
          </View>
          <View>
            <Text style={styles.publishedAtText}>
              {moment(publishedAt, "YYYYMMDD").fromNow()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <ImageView image={urlToImage} />
        <View style={styles.controlIcons}>
          <Pressable onPress={() => {}}>
            <FontAwesome name="newspaper-o" size={14} color="#000000" />
          </Pressable>
          <Pressable onPress={handlePresentModalPress}>
            <Entypo name="dots-three-vertical" size={14} color="#000000" />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Article;
