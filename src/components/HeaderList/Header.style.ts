import {RALEWAY_REGULAR} from '../../common/fonts';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(2),
  },
  connected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectedText: {
    fontSize: wp(5),
    color: '#000',
  },
  header: {
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: wp(5),
    color: '#000',
  },
  searchContainer: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
  },
  search: {
    borderRadius: wp(3),
    borderWidth: wp(0.1),
    color: '#808080',
    padding: wp(5),
    backgroundColor: '#fff',
  },
  itemsHeader: {
    marginHorizontal: 3,
  },
  allNews: {
    color: '#000',
    fontFamily: RALEWAY_REGULAR,
    padding: wp(2),
    fontWeight: 'bold',
    paddingHorizontal: wp(5),
    textDecorationLine: 'underline',
  },
  listContainer: {
    flex: -1,
  },
});

export default style;
