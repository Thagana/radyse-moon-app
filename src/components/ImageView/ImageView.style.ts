import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  cover: {
    width: wp(30),
    height: hp(16),
    borderTopLeftRadius: wp(2),
    borderBottomLeftRadius: wp(2),
  },
});

export default styles;
