import {RALEWAY_REGULAR, RALEWAY_THIN} from '../../common/fonts';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: wp(100),
    height: hp(35),
  },
  titleText: {
    color: '#000',
    fontSize: wp(5),
    fontWeight: 'bold',
    margin: wp(2),
  },
  descriptionText: {
    color: '#000',
    fontSize: wp(4),
    fontFamily: RALEWAY_REGULAR,
    margin: wp(2),
  },
  thumb: {
    width: wp(10),
    height: hp(5),
    borderRadius: wp(10 / 2),
  },
  sourceText: {
    color: '#000',
    fontSize: wp(4),
    fontFamily: RALEWAY_REGULAR,
  },
  publishedAtText: {
    color: '#000',
    fontSize: wp(4),
    marginHorizontal: wp(2),
    fontFamily: RALEWAY_THIN,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp(2),
  },
  avatar: {
    borderRadius: wp(10 / 2),
    borderWidth: wp(0.5),
    borderColor: '#007AFF',
    marginRight: wp(2),
  },
});

export default styles;
