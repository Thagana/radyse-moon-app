import React from 'react';
import {View, Text, Pressable} from 'react-native';
import LottieView from 'lottie-react-native';
import * as WebBrowser from 'expo-web-browser';

import styles from './LinkView.styles';
type Props = {
  route?: {
    params: {
      url: string;
    };
  };
};

const LinkView = (props: Props) => {
  const { route } = props;
  const {url} = route!.params;
  const animation = React.useRef(null);

  const openBrowser = React.useCallback(async () => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  React.useEffect(() => {
    setTimeout(() => {
      openBrowser();
    }, 3000);
  }, [openBrowser]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>
          We are redirecting you to the url{' '}
          <Text style={styles.url}>{url}</Text>
        </Text>
      </View>
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={styles.animation}
          speed={0.5}
          source={require('../../assets/progress-bar.json')}
        />
      </View>
      <View style={styles.action}>
        <Pressable style={styles.cancelBtn}>
          <Text>CANCEL REQUEST</Text>
        </Pressable>
        <Pressable style={styles.proceedBtn}>
          <Text>GO NOW</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LinkView;
