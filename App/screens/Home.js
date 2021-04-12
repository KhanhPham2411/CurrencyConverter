import React from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text
} from 'react-native';
import { format } from 'date-fns';
import { ConversionInput } from '../components/ConversionInput';

import colors from '../constants/colors';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackGround: {
    width: screen.width*0.45,
    height: screen.height*0.45,
  },
  logo: {
    position: 'absolute',
    width: screen.width*0.25,
    height: screen.height*0.25,
  },
  textHeader: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
    textAlign: "center",
  },
  text: {
    color: colors.white,
    fontSize: 13,
    textAlign: "center",
  },
});

export default () => {
  const baseCurrency = 'USD';
  const quoteCurrency = 'GBP';
  const conversionRate = 0.8345;
  const date = new Date();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blue} />

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/background.png')} style={styles.logoBackGround} resizeMode='contain' />
        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
      </View>

      <Text style={styles.textHeader}>Currency Converter</Text>
      <ConversionInput
        text={baseCurrency}
        onButtonPress={()=> alert("todo!")}
        value="123"
        onChangeText={(text) => console.log("text", text)}
        keyboardType="numeric"
      />
      <ConversionInput
        text={quoteCurrency}
        onButtonPress={()=> alert("todo!")}
        value="123"
        editable={false}
      />
      <Text style={styles.text}>
        {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${format(
          date, 'MMMM do, yyyy'
        )}.`}
      </Text>
    </View>
  );
};