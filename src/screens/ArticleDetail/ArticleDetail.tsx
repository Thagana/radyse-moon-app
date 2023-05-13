import * as React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './ArticleDetails.styles';
import moment from 'moment';

type Props = {
  navigation: {
    navigate(param: string): void;
  };
  route: {
    params: {
      urlToImage: string;
      title: string;
      source: string;
      publishedAt: string;
      description: string;
      url: string;
    };
  };
};

function ArticleDetail({ route }: Props) {
  const {
    title,
    description,
    urlToImage,
    source,
    publishedAt,
    url,
  } = route.params;
  const [thumb, setThumb] = React.useState('');

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

  React.useEffect(() => {
    fetchThumb();
  }, [fetchThumb]);

  return (
    <ScrollView style={styles.container}>
      <View id={`item.${urlToImage}.image`}>
        <Image
          source={{ uri: urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View>
        <View id={`item.${urlToImage}.title`}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
      <View style={styles.metaInfo}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: thumb }}
            style={styles.thumb}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.sourceText}>{source}</Text>
        </View>
        <View>
          <Text>-</Text>
        </View>
        <View>
          <Text style={styles.publishedAtText}>
            {moment(publishedAt, 'YYYYMMDD').fromNow()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}


export default ArticleDetail;
