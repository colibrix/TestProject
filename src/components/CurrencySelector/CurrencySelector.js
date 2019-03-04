import React from 'react';
import {
  Picker,
  Icon,
} from 'native-base';
import PropTypes from 'prop-types';
import { colors } from "../../utils/colors";

const CurrencySelector = props => {
  const { selectedValue, onValueChange, options } = props;
  const renderSelectItems = () => (
    options.map(element =>
      <Picker.Item
        key={element.value}
        label={element.label}
        value={element.value}
      />)
  );
  return (
    <Picker
      note
      mode="dialog"
      style={{width: 150}}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      iosIcon={
        <Icon
          name="arrow-down"
          style={{ color: colors.PRIMARY_COLOR, fontSize: 25 }}
        />
      }
    >
      { renderSelectItems() }
    </Picker>
  );
};

CurrencySelector.propTypes = {
  selectedValue: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};

export default CurrencySelector;
