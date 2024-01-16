import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import { RALEWAY_REGULAR } from '../../common/fonts';
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  search: {
    margin: wp(3),
    flexDirection: 'row',
  },
  textInput: {
    borderTopLeftRadius: wp(2),
    borderBottomLeftRadius: wp(2),
    borderWidth: wp(0.1),
    color: '#808080',
    padding: wp(5),
    backgroundColor: '#fff',
    width: wp(80),
    height: hp(8),
  },
  searchButton: {
    backgroundColor: '#007AFF',
    height: hp(8),
    width: wp(15),
    borderTopRightRadius: wp(2),
    borderBottomRightRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireText: {
    color: '#FFF',
  },
  unavailable: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  unavailableText: {
    fontFamily: RALEWAY_REGULAR,
    fontSize: wp(5),
  }
});

export default styles;
