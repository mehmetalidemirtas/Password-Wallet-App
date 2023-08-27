import React, {useState} from 'react';
import {
  Clipboard,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';

const TextView = ({password}) => {
  const [copiedText, setCopiedText] = useState('');

  const handlePress = text => {
    Clipboard.setString(text);
    console.log('Copied:', text);
    showMessage({
      message: 'Password Copied',
      description: 'Copied password: ' + text,
      type: 'info',
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.profileItem}
        onPress={() => handlePress(password)}>
        <View style={styles.container}>
          <View style={styles.text_container}>
            <Text style={{color: 'black'}}>{password}</Text>
          </View>
          <Icon name={'content-copy'} size={25} color={'#aaa'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_container: {
    flexDirection: 'row',
    flex: 0.95,
    alignItems: 'center',
    marginRight: 50,
  },
  profileItem: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#FFF4F4',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TextView;
