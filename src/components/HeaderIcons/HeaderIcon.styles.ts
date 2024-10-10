import {widthPercentageToDP} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginHorizontal: widthPercentageToDP(2),
  },
});
export default styles;
