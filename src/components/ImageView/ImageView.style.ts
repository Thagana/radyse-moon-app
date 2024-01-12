import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  cover: {
    width: wp(26),
    height: hp(10),
    borderRadius: wp(2),
  },
});

export default styles;
