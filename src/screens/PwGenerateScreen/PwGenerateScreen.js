import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
  View,
} from 'react-native';
import Input from '../../components/Input';
import TextView from '../../components/TextView';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-2293112676662524/3264716416';
import {showMessage} from 'react-native-flash-message';

let charset =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()_';

const PwGenerateScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(20);

  const generatePass = async () => {
    let pass = '';

    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }

    await setPassword(pass);
    console.log('pass: ' + pass);
    console.log('password: ' + password);
    showMessage({
      message: 'Password created successfully',
      description: pass,
      type: 'success',
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <Image
            source={require('../../assets/logo-gp.png')}
            style={{
              height: Dimensions.get('window').width * 0.85,
              width: Dimensions.get('window').height / 3,
              resizeMode: 'contain',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
              color: '#949494',
              fontWeight: 'bold',
              padding: 5,
            }}>
            Generate and Secure: Create Strong Passwords, Safely Stored
          </Text>
          {password !== '' && <TextView password={password} />}
          <View style={{justifyContent: 'space-evenly'}}>
            {password !== '' && <Input password={password} />}
            <TouchableOpacity style={styles.button} onPress={generatePass}>
              <Text style={styles.buttonText}>Generate Password</Text>
            </TouchableOpacity>
          </View>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    padding: 10,
    marginBottom: 10,
    margin: 5,
    backgroundColor: '#949494',
    borderRadius: 10,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PwGenerateScreen;
