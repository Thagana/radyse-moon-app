import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './EmptyList.style';

export default function EmptyList() {
  return (
    <View style={styles.container}>
      <View>
        <Text>The List is Empty</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
