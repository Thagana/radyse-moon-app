import React from 'react';
import {Image, View} from 'react-native';
import styles from './ImageView.style';

type Props = {
  image: string;
};

export default function ImageView(props: Props) {
  const {image} = props;
  return (
    <View id={`item.${image}.image`}>
      <Image
        source={
          image === null || image === ''
            ? require('../../assets/download.png')
            : {uri: image}
        }
        style={styles.cover}
      />
    </View>
  );
}
