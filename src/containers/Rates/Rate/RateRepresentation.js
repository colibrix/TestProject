import React from 'react';
import PropTypes from 'prop-types';
import { Text } from "react-native";
import {
  CURRENCY_NAMES,
  DEFAULT_SCALE
} from "../../../utils/constants";

export const RateRepresentation = ({rateName, rate}) => (
  <Text>
    {`${DEFAULT_SCALE} ${rateName}: ${rate.toFixed(4)} ${CURRENCY_NAMES.BYN}`}
  </Text>
);

RateRepresentation.propTypes = {
  rateName: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
};
