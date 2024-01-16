import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RALEWAY_REGULAR, RALEWAY_BOLD, RALEWAY_LIGHT} from '../../common/fonts';

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 27,
  },
  connected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectedText: {
    fontSize: 20,
  },
  header: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  search: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 50,
    marginTop: 3,
    marginHorizontal: 5,
    color: '#fff',
    padding: 5,
  },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  iconContainer: {
    padding: 10,
  },
  temperatureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  itemsHeader: {
    marginHorizontal: 3,
  },
  listContainer: {
    flex: -1,
  },
  //
  bottomModalListContainer: {
    flex: 1,
    padding: hp(2),
  },
  bottomModalList: {
    flexDirection: 'column',
    gap: hp(2),
  },
  bottomModalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(2),
  },
  bottomModalTextContainer: {
    flexDirection: 'row',
  },
  bottomModalText: {
    fontFamily: RALEWAY_REGULAR,
    fontSize: wp(5),
  }
});

export default style;
