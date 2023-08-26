import React, {useState} from 'react';
import {Modal, TextInput, TouchableOpacity, StyleSheet, Text, Pressable, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Input = ({password}) => {
 
    const saveToAsync = async () => {
        const data = {
            password,
            value
          };
      
        key = `passwords_${password}_${value}`
        console.log(password);
        console.log(value);
        try {
            console.log(data);
            AsyncStorage.setItem(key, JSON.stringify(data));
            console.log('Password saved to async storage.');
          } catch (error) {
            console.log('Error saving bank account to async storage: ', error);
          }
        setModalVisible(!modalVisible);
        onChangeText("");
    }
    const handleSubmit = async () => {
        try {
          await saveToAsync();
        } catch (error) {
          console.log(error);
        }
      };
  const [modalVisible, setModalVisible] = useState(false);
  const [value, onChangeText] = React.useState('');
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        style={{flex:1}}
        visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}> 
            <Text>{password}</Text>
            <TextInput
    style={{borderColor:"#539165", borderWidth:1,borderRadius:10, padding:10, margin:10, width:Dimensions.get('window').width * 0.75}}
    placeholder="Enter platform name"
    onChangeText={text => onChangeText(text)}
    value={value}
  />
            <TouchableOpacity
              style={[styles.button, {width:Dimensions.get('window').width * 0.75}]}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    
    <View style={{}}>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Save Password</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" ,
  },
  button:{
    padding:10,
    margin:5,
    borderRadius:10,
    height:50,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:0.7,
    borderColor:"#949494"
  },
  buttonText:{
    color: "#949494",
    fontWeight:"bold",
    fontSize:20,
  },
  modalView: {
    margin: 20,
    width:300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Input;