import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RALEWAY_REGULAR, RALEWAY_BOLD} from '../../common/fonts';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#000',
    borderRadius: wp(1),
    marginHorizontal: wp(3),
    marginVertical: hp(0.5),
    justifyContent: 'space-between',
    height: hp(16),
    width: wp(95),
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  headerText: {
    fontFamily: RALEWAY_BOLD,
    color: '#000',
    fontSize: wp(3.5),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  pipe: {
    marginHorizontal: wp(1),
    color: '#000',
  },
  sourceText: {
    fontFamily: RALEWAY_REGULAR,
    color: '#007AFF',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
    marginVertical: hp(1),
  },
  publishedAtText: {
    fontFamily: RALEWAY_REGULAR,
    color: '#000',
  },
});

export default styles;
