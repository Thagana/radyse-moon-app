import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './EmptyList.style';
import LottieView from 'lottie-react-native';

export default function EmptyList() {
  const animation = React.useRef(null);

  return (
    <View style={styles.container}>
      <View>
        <Text>The News Article Empty for now</Text>
      </View>
    </View>
  );
}
