import React from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory-native";
import {
  Dimensions,
  View,
} from "react-native";
import { colors } from "../../../utils/colors";
import PropTypes from 'prop-types';
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleZoom = (domain) => {
    this.setState({zoomDomain: domain});
  };

  resetZoom = () => {
    const nextDomain = this.recalculate();
    this.setState({zoomDomain: nextDomain});
  };

  recalculate = () => {
    const { data } = this.props;
    let yArray = data.map(point => point.y);
    const xMin = data[0].x;
    const xMax = data[data.length - 1].x;
    const yMin = Math.min.apply(null, yArray);
    const yMax = Math.max.apply(null, yArray);
    return {x: [xMin, xMax], y: [yMin, yMax]};
  };

  componentDidUpdate(prevProps, nextState) {
    const { data } = this.props;
    if (prevProps.data[0].x !== data[0].x) {
      this.resetZoom();
    }
  }

  render() {
    const { data } = this.props;
    return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <VictoryChart
        scale={{ x: "time" }}
        theme={VictoryTheme.material}
        width={Dimensions.get('window').width}
        height={250}
        containerComponent={
          <VictoryZoomContainer
            onZoomDomainChange={this.handleZoom}
            zoomDomain={this.state.zoomDomain}
          />
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
      <PrimaryButton onPress={this.resetZoom} label="Reset zoom"/>
    </View>);
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.instanceOf(Date),
    y: PropTypes.number.isRequired,
  })).isRequired,
};

export default Chart;
