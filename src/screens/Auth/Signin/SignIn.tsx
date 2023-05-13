import * as React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import styles from './Signin.style';
import Server from '../../../service/server';
import {FormValidator} from '../../../helpers/FormValidator';
import Loading from '../../../components/Loading';

type Props = {
  navigation: {
    navigate(param: string): void;
  };
};

type STATUS_MESSAGES = 'LOADING' | 'FAILED' | 'ERROR' | 'SUCCESS' | 'IDLE';

export default function SignIn(props: Props) {
  const {navigation} = props;
  const [STATE_MESSAGE, setStateMessage] =
    React.useState<STATUS_MESSAGES>('IDLE');
  const [email, setEmail] = React.useState('');

  const handleChange = (val: string) => {
    setEmail(val);
  };

  const handleAuth = async () => {
    try {
      if (!FormValidator.emailValidator(email)) {
        showMessage({
          message: 'Email is not valid',
          type: 'danger',
        });
        return;
      }

      setStateMessage('LOADING');

      const response = await Server.register(email, '');

      if (response.status !== 200) {
        showMessage({
          message: response.data.message,
          type: 'danger',
        });
        setStateMessage('IDLE');
      } else {
        navigation.navigate('verify');
        setStateMessage('IDLE');
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'SOMETHING WENT WRONG, PLEASE TRY AGAIN',
        type: 'danger',
      });
      setStateMessage('IDLE');
    }
  };

  const handleNavigation = () => {
    navigation.navigate('verify');
  };

  return (
    <View style={styles.container}>
      {STATE_MESSAGE === 'LOADING' && <Loading />}
      {STATE_MESSAGE === 'IDLE' && (
        <View style={styles.googleGoogleContainer}>
          <View>
            <Image
              source={require('../../../assets/ic_launch.png')}
              style={styles.Avatar}
              resizeMode="contain"
            />
          </View>
          <View>
            <View>
              <TextInput
                placeholder="Enter Email"
                value={email}
                onChangeText={handleChange}
                keyboardType="email-address"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={handleAuth}
                activeOpacity={0.7}
                style={styles.googleButton}>
                <Text style={styles.textButton}>Send</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={handleNavigation}>
                <Text style={styles.verifyCode}>Verify Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
