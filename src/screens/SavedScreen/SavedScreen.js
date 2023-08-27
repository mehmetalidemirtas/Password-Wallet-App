import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Clipboard,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';

const SavedScreen = () => {
  const [bank, setBank] = useState([]);

  const handlePress = text => {
    Clipboard.setString(text);
    console.log('Copied:', text);
    showMessage({
      message: 'Password Copied',
      description: 'Copied password: ' + text,
      type: 'info',
    });
  };

  const removeValue = async (password, value) => {
    const key = `passwords_${password}_${value}`;
    try {
      await AsyncStorage.removeItem(key);
      setBank(prevBank => prevBank.filter(item => item.value !== value));
      console.log('Done.');
      showMessage({
        message: 'Password deleted',
        description: 'Deleted ' + value + ': ' + password,
        type: 'warning',
      });
    } catch (e) {
      console.error('Error delete:', e);
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  useFocusEffect(
    React.useCallback(() => {
      getBankData();
    }, []),
  );

  const AllBankAccountRender = ({item}) => {
    return (
      <>
        <View
          style={{
            padding: 10,
            margin: 5,
            backgroundColor: '#949494',
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Platform Name: {''}
                </Text>
                <Text style={{color: 'white'}}>{item.value}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Password: {''}
                </Text>
                <Text style={{color: 'white'}}>{item.password}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Icon
                style={{marginRight: 10}}
                name={'delete-outline'}
                size={27}
                color={'white'}
                onPress={() => removeValue(item.password, item.value)}
              />
              <Icon
                name={'content-copy'}
                size={25}
                color={'white'}
                onPress={() => handlePress(item.password)}
              />
            </View>
          </View>
        </View>
        <View></View>
      </>
    );
  };
  const getBankData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filterKey = `passwords_`;
      const bankAccountKeys = keys.filter(key => key.includes(filterKey));
      const bankAccounts = await Promise.all(
        bankAccountKeys.map(async key => {
          const bankAccount = await AsyncStorage.getItem(key);
          return JSON.parse(bankAccount);
        }),
      );
      setBank(bankAccounts);
    } catch (e) {
      console.error('Error loading bank accounts from async storage:', e);
    }
  };
  useEffect(() => {
    getBankData();
    return () => {};
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <View>
          <FlatList
            key={bank.length}
            data={bank}
            renderItem={({item}) => <AllBankAccountRender item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default SavedScreen;
