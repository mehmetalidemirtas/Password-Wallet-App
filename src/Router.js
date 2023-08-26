import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PwGenerateScreen from './screens/PwGenerateScreen';
import SavedScreen from './screens/SavedScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer options={{color:"black"}}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={PwGenerateScreen} 
        options={{
            tabBarLabel: "Generate Password",
            headerTitle:"Generate Password",
            headerTitleAlign:"center",
            tabBarActiveTintColor:"black",
            tabBarIcon: () => (
              <Icon name="lock-plus" color={"black"} size={25} />
            ),
          }} />
        <Tab.Screen name="SavedScreen" component={SavedScreen}
           options={{
            tabBarLabel: "Saved Password",
            presentation: 'transparentModal',
            headerTitle:"Saved Password",
            tabBarActiveTintColor:"black",
            headerTitleAlign:"center",
            tabBarIcon: () => (
              <Icon name="bookmark" color={"black"} size={25} />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
