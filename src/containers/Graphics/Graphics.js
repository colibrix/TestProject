import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import GraphicsContainer from "./GraphicsContainer";
import { colors } from "../../utils/colors";

const Graphics = () => {
  return (
    <View style={styles.container}>
      <GraphicsContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG_COLOR,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Graphics;