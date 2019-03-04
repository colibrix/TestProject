import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ComparisonContainer from "./ComparisonContainer";
import { colors } from "../../utils/colors";

const Comparison = () => {
  return (
    <View style={styles.container}>
      <ComparisonContainer />
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

export default Comparison;
