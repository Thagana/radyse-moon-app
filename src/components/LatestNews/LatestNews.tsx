import {FlatList} from 'react-native';
import React from 'react';
import LatestItem from '../Articles/LatestItem';

type Props = {
  latest: any[];
  navigation: {
    navigate(param: string, payload: any): void;
  };
};

export default function LatestNews(props: Props) {
  const {latest, navigation} = props;
  return (
    <FlatList
      horizontal
      data={latest}
      renderItem={({item}) => (
        <LatestItem item={item} navigation={navigation} />
      )}
    />
  );
}
