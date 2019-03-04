import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import HomeContainer from "./HomeContainer";
import { colors } from "../../utils/colors";

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeContainer />
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

export default Home;
