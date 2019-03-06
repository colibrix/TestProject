import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import Rates from "../Rates/Rates";

class HomeContainer extends React.Component {
  render() {
    const { errorMessage } = this.props;
    return (
      <View style={styles.container}>
        { errorMessage ?
          <Text style={styles.errorText}>
            {this.props.errorMessage}
          </Text>
          : null
        }
        <Rates />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: 'red',
  },
});

const mapStateToProps = store => {
  return {
    errorMessage: store.appReducer.errorMessage,
  }
};

export default connect(mapStateToProps)(HomeContainer);
