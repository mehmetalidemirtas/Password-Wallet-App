import React,{useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../components/Input';
import TextView from '../../components/TextView';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

let charset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'!@#$%¨&*()_+<>";


const PwGenerateScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [password, setPassword] = useState("");
  const [size, setSize] = useState(15);

  const generatePass = async () => {
    let pass = "";
  
    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n));
    }
  
    await setPassword(pass);
    console.log("pass: " + pass);
    console.log("password: " + password);
  };
  return (
    <ScrollView style={styles.container}>
     
        <View style={{flex:1, marginVertical:20}}>
        <Image source={require("../../assets/logo-gp.png")} 
        style={{height: Dimensions.get('window').width * 0.9,
        width: Dimensions.get('window').height /2,
        resizeMode: 'contain',
        alignItems: "center",
        alignSelf: "center",   }} /> 
        <Text style={{fontSize:17, textAlign:"center", color:"#949494", fontWeight:"bold", padding:5}}>Generate and Secure: Create Strong Passwords, Safely Stored</Text>
        {password !== "" && <TextView password={password} />}
        <View style={{justifyContent:"space-evenly"}}>
        <Input password={password} />
        <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Generate Password</Text>
      </TouchableOpacity>
  
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
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
  button:{
    padding:10,
    marginBottom:10,
    margin:5,
    backgroundColor:"#949494",
    borderRadius:10,
    height:55,
    justifyContent:"center",
    alignItems:"center",
  },
  buttonText:{
    color: "white",
    fontWeight:"bold",
    fontSize:20,
  },
  title:{
    textAlign:"center",
    fontSize:25,
    fontWeight:"bold",
    color:"black",
  }
});

export default PwGenerateScreen;
