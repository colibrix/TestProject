import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import PropTypes from 'prop-types';

const NumericInput = props => {
  const { currencyName, onChangeText, value } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        { currencyName }
      </Text>
      <TextInput
        keyboardType='numeric'
        value={value}
        onChangeText={ (value) => { onChangeText(value, currencyName) }}
        style={styles.inputContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flexBasis: '20%',
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'gray',
    flexBasis: '80%',
  },
});

NumericInput.propTypes = {
  currencyName: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default NumericInput;
