import React from 'react';
import {View, Text, TextInput} from 'react-native';
import LatestNews from '../LatestNews';

import styles from './Header.style';

type Props = {
  term: string;
  setTerm(param: string): void;
  latest: any[];
  navigation: {
    navigate(param: string): void;
  };
};

export default function HeaderList(props: Props) {
  const {term, setTerm, navigation, latest} = props;

  const mounted = React.useRef(true);

  React.useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Radyse Moon</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          onChangeText={val => setTerm(val)}
          value={term}
          onFocus={() => navigation.navigate('Search')}
          style={styles.search}
        />
      </View>
      <View>
        {latest.length > 0 && <Text style={styles.allNews}>Latest News</Text>}
      </View>
      <LatestNews latest={latest} navigation={navigation} />
      <View>
        <Text style={styles.allNews}>All News</Text>
      </View>
    </>
  );
}
