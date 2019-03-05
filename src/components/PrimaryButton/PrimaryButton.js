import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from "../../utils/colors";

const PrimaryButton = props => {
  const { onPress, label } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PRIMARY_COLOR,
    width: '50%',
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  }
});

PrimaryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default PrimaryButton;
