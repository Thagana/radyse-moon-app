import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RALEWAY_BOLD, RALEWAY_REGULAR} from '../../common/fonts';

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
    marginHorizontal: wp(2),
  },
  rowAction: {
    marginHorizontal: wp(5),
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
  backgroundModal: {
    backgroundColor: '#fff',
  },
  modalHeader: {
    padding: wp(2),
  },
  modalHeaderText: {
    fontFamily: RALEWAY_BOLD,
    fontSize: wp(4),
    padding: wp(1)
  },
  modalHeaderTextBody: {
    fontFamily: RALEWAY_REGULAR,
    fontSize: wp(4),
    padding: wp(1)
  },
  modalTermsAndConditions: {
    padding: wp(1),
    fontFamily: RALEWAY_REGULAR,
  },
  modalControls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(2),
  }
});

export default styles;
