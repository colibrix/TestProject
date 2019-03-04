import React from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";
import { Dimensions } from "react-native";
import { colors } from "../../../utils/colors";
import PropTypes from 'prop-types';

const Chart = props => {
  const { data } = props;

  return (
      <VictoryChart
        scale={{ x: "time" }}
        theme={VictoryTheme.material}
        width={Dimensions.get('window').width}
        height={300}
        containerComponent={
          <VictoryZoomContainer />
        }
      >
        <VictoryAxis
          style={{tickLabels: {angle: -45}}}
        />
        <VictoryAxis dependentAxis />
        <VictoryLine
          style={{
            data: { stroke: colors.PRIMARY_COLOR },
            parent: { border: "1px solid #ccc"}
          }}
          data={data}
        />
      </VictoryChart>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.instanceOf(Date),
    y: PropTypes.number.isRequired,
  })).isRequired,
};

export default Chart;
