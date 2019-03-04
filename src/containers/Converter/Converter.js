import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ConverterContainer from "./ConverterContainer";
import { colors } from "../../utils/colors";

const Converter = () => {
  return (
    <View style={styles.container}>
      <ConverterContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.BG_COLOR,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Converter;