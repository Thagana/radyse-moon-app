import React from 'react';
import {Image, View} from 'react-native';
import styles from './ImageView.style';

type Props = {
  image: string;
};

export default function ImageView(props: Props) {
  const {image} = props;
  return (
      <Image
        id={`item.${image}.image`}
        source={
          image === null || image === ''
            ? require('../../assets/download.png')
            : {uri: image}
        }
        style={styles.cover}
      />
  );
}
