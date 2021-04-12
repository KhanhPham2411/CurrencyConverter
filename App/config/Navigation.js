import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Options from '../screens/Options';

const MainStack = createStackNavigator();
const MainStackScreen = () => {
  return (
    <MainStack.Navigator 
      // headerMode="none" 
      initialRouteName="Options"
    >
      <MainStack.Screen 
        name="Home" 
        component={Home} 
        options={{headerShown: false}}
      />
      <MainStack.Screen name="Options" component={Options} />

    </MainStack.Navigator>
  );
};
export default () => (
  <NavigationContainer>
    <MainStackScreen />
  </NavigationContainer>
);