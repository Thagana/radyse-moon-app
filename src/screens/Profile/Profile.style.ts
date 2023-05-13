import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RALEWAY_REGULAR} from '../../common/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(7),
    marginHorizontal: wp(1),
    borderRadius: wp(2),
    backgroundColor: '#fff',
    marginVertical: wp(1),
  },
  rowItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  rowAction: {
    marginHorizontal: 12,
  },
  showText: {
    marginLeft: 2,
    color: '#000',
    fontFamily: RALEWAY_REGULAR,
  },
  listText: {
    color: '#000',
    fontFamily: RALEWAY_REGULAR,
  },
});

export default styles;
