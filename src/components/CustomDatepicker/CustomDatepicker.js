import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import { StyleSheet } from 'react-native';

const CustomDatepicker = props => {
  const { date, onDateChange, } = props;
  return (
    <DatePicker
      style={styles.picker}
      showIcon={false}
      confirmBtnText="OK"
      cancelBtnText="Cancel"
      date={date}
      mode="date"
      maxDate={new Date()}
      minDate={new Date(2016, 6, 1)}
      onDateChange={onDateChange}
      customStyles={{ dateInput: styles.dateInput}}
    />
  );
};

const styles = StyleSheet.create({
  dateInput: {
    borderRadius: 5,
  },
  picker: {
    width: '45%',
  }
});

CustomDatepicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  date: PropTypes.any.isRequired,
};

export default CustomDatepicker;
