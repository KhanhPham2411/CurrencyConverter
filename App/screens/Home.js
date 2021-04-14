import React, { useState} from "react";
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
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [quoteCurrency, setQuoteCurrency] = useState("GBP");
  const [value, setValue] = useState('100');
  
  const conversionRate = 0.8345;
  const date = new Date();

  const [scrollEnabled, setScrollEnabled] = useState(false);

  const swapCurrencies = () => {
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(baseCurrency);
  };

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
              activeCurrency: baseCurrency,
              onChange: (currency) => setBaseCurrency(currency),
            })}
            value={value}
            onChangeText={(text) => setValue(text)}
            keyboardType="numeric"
          />
          <ConversionInput
            text={quoteCurrency}
            onButtonPress={() => navigation.push("CurrencyList", {
              title: "Quote Currency",
              activeCurrency: quoteCurrency,
              onChange: (currency) => setQuoteCurrency(currency),
            })}
            value={
              value && `${(parseFloat(value)*conversionRate).toFixed(2)}`
            }
            editable={false}
          />
          <Text style={styles.text}>
            {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${format(
              date,
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
