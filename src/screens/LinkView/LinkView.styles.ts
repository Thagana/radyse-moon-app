import {RALEWAY_REGULAR} from '../../common/fonts';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: '#000',
    fontFamily: RALEWAY_REGULAR,
    fontSize: wp(4),
  },
  url: {
    color: '#007AFF',
    fontFamily: RALEWAY_REGULAR,
  },
  action: {
    flexDirection: 'row',
  },
  cancelBtn: {
    margin: wp(2),
    backgroundColor: '#007AFF',
    width: wp(46),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
  },
  proceedBtn: {
    margin: wp(2),
    backgroundColor: '#808080',
    width: wp(46),
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: wp(80),
    height: hp(40),
  },
});

export default styles;
