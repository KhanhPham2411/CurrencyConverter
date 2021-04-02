import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

console.log("hello");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>hi, Open up App.js to start working on your app!</Text>
    </View>
  );
}


