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
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../../utils/colors";
import PropTypes from 'prop-types';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleZoom = (domain) => {
    this.setState({zoomDomain: domain});
  };

  resetZoom = () => {
    const { data } = this.props;
    let yArray = data.map(point => point.y);
    const xMin = data[0].x;
    const xMax = data[data.length - 1].x;
    const yMin = Math.min.apply(null, yArray);
    const yMax = Math.max.apply(null, yArray);
    this.setState({zoomDomain: {x: [xMin, xMax], y: [yMin, yMax]}});
  };

  render() {
    const { data } = this.props;
    return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <VictoryChart
        scale={{ x: "time" }}
        theme={VictoryTheme.material}
        width={Dimensions.get('window').width}
        height={300}
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
      <TouchableOpacity style={styles.button} onPress={this.resetZoom}>
        <Text style={styles.buttonText}>Reset zoom</Text>
      </TouchableOpacity>
    </View>);
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PRIMARY_COLOR,
    width: '50%',
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  }
});

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.instanceOf(Date),
    y: PropTypes.number.isRequired,
  })).isRequired,
};

export default Chart;
