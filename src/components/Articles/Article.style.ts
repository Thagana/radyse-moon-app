import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RALEWAY_REGULAR, RALEWAY_BOLD, RALEWAY_LIGHT} from '../../common/fonts';

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
    padding: wp(2),
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: hp(1),
  },
  contentTextContainer: {
    height: hp(10),
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(1),
  },
  headerText: {
    fontFamily: RALEWAY_BOLD,
    color: '#000',
    fontSize: wp(3.5),
    fontWeight: 'bold',
    marginRight: wp(2),
  },
  pipe: {
    marginHorizontal: wp(1),
    color: '#000',
  },
  sourceText: {
    fontFamily: RALEWAY_LIGHT,
  },
  authorText: {
    fontFamily: RALEWAY_REGULAR,
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
  imageContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: hp(1),
  },
  controlIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: hp(3),
  },
  spacer: {
    height: hp(1),
  },
  thumb: {
    height: hp(2),
    width: hp(2),
  }
});

export default styles;
