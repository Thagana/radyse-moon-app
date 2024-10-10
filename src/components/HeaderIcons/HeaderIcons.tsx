import * as React from 'react';
import {View, Share, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import styles from './HeaderIcon.styles';
import {showMessage} from 'react-native-flash-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
type Props = {
  navigation: {
    navigate(param: string, payload: any): void;
  };
  params: {
    description: string;
    publishedAt: string;
    source: string;
    title: string;
    urlToImage: string;
    url: string;
  };
};

export default function HeaderIcons(props: Props) {
  const url = props.params.url;
  const title = props.params.title;

  const handleShare = async () => {
    try {
      if (!url || !title) {
        showMessage({
          message: 'Share content cannot be empty',
          type: 'info',
        });
        return;
      }
      await Share.share({
        title: title,
        message: url,
      });
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Something went wrong while trying to share',
        type: 'danger',
      });
    }
  };
  const handleBookMark = () => {};
  const handleWebsiteVisit = () => {
    props.navigation.navigate('LinkView', {
      url,
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleWebsiteVisit}>
        <MaterialCommunityIcons
          name="globe-model"
          color="#000"
          size={widthPercentageToDP(6.5)}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleBookMark}>
        <Ionicons
          name="bookmark-outline"
          color="#000"
          size={widthPercentageToDP(6.5)}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleShare}>
        <Ionicons
          name="share-social"
          color="#000"
          size={widthPercentageToDP(6.5)}
        />
      </TouchableOpacity>
    </View>
  );
}
