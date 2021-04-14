import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { useSafeArea } from 'react-native-safe-area-context';
import { RowItem, RowSeparator } from '../components/RowItem';

import colors from '../constants/colors';
import currencies from '../data/currencies.json'

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    backgroundColor: colors.blue,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default ({navigation, route={}}) => {
  const insets = useSafeArea();
  const params = route.params || {};
  
  return (
    <View style={{backgroundColor: colors.white}}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList 
        data={currencies}
        renderItem={({item}) =>{
          const selected = (params.activeCurrency === item);

          return (
            <RowItem 
              text={item}
              onPress={() => navigation.pop()}
              rightIcon={
                selected && (
                  <View style={styles.icon}>
                    <Entypo name="check" size={20} color={colors.white} />
                  </View>
                )
              }
            />
          );
        }}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <RowSeparator />}
        ListFooterComponent={() => <View style={{paddingBottom: insets.bottom}} />}
      />
    </View>
  );
};