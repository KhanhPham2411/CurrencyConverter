import React, { useState, useContext} from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text,
  ScrollView,
  SafeAreaView,
  Touchable,
} from "react-native";
import { format } from "date-fns";
import { Entypo } from '@expo/vector-icons';

import { ConversionInput } from "../components/ConversionInput";

import colors from "../constants/colors";
import { Button } from "../components/Button";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ConversionContext } from "../util/ConversionContext";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
    // paddingTop: screen.height*0.2,
  },
  content: {
    // paddingTop: screen.height*0.1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoBackGround: {
    width: screen.width * 0.45,
    height: screen.height * 0.45,
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.height * 0.25,
  },
  textHeader: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
    marginVertical: 20,
    textAlign: "center",
  },
  text: {
    color: colors.white,
    fontSize: 13,
    textAlign: "center",
  },
  header: {
    alignItems: "flex-end",
    marginHorizontal: 20,

  },
});

export default ({navigation}) => {
  // let baseCurrency = "USD";
  // let quoteCurrency = "GBP";
 
  const [value, setValue] = useState('100');

  const {
    baseCurrency, 
    quoteCurrency, 
    swapCurrencies, 
    date, 
    rates
  } = useContext(ConversionContext);

  const conversionRate = rates[quoteCurrency];

  const [scrollEnabled, setScrollEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.content}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.blue} />

          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => navigation.push('Options')}>
              <Entypo name="cog" size={32} color={colors.white} />
            </TouchableOpacity>
            
          </SafeAreaView>

          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/background.png")}
              style={styles.logoBackGround}
              resizeMode="contain"
            />
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.textHeader}>Currency Converter</Text>
          <ConversionInput
            text={baseCurrency}
            onButtonPress={() => navigation.push("CurrencyList", {
              title: "Base Currency", 
              isBaseCurrency: true,
            })}
            value={value}
            onChangeText={(text) => setValue(text)}
            keyboardType="numeric"
          />
          <ConversionInput
            text={quoteCurrency}
            onButtonPress={() => navigation.push("CurrencyList", {
              title: "Quote Currency",
              isBaseCurrency: false,
            })}
            value={
              value && `${(parseFloat(value)*conversionRate).toFixed(2)}`
            }
            editable={false}
          />
          <Text style={styles.text}>
            {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${date && format(
              new Date(date),
              "MMMM do, yyyy"
            )}.`}
          </Text>

          <Button text="Reverse Currencies" onPress={() => swapCurrencies()} />

          <KeyboardSpacer onToggle={(keyboardIsVisible) => setScrollEnabled(keyboardIsVisible)} />
        </View>
      </ScrollView>
    </View>
  );
};
