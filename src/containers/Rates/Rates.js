import React from 'react';
import PropTypes from 'prop-types';
import { RateRepresentation } from "./Rate/RateRepresentation";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {
  Card,
  CardItem,
} from 'native-base';
import { connect } from "react-redux";
import { colors } from "../../utils/colors";

const Rates = props => {
  const { exchangeRates, isFetching } = props;
  let rates = [];
  const renderRates = () => {
    let keyCounter = 0;
    for (const [currencyName, currencyValue] of Object.entries(exchangeRates)) {
      keyCounter += 1;
      if (exchangeRates.hasOwnProperty(currencyName)) {
        rates.push(
          <RateRepresentation
            key={keyCounter}
            rateName={currencyName}
            rate={currencyValue}
          />);
      }
    }
    return rates;
  };

  return (
    <View style={styles.container}>
      <Text>For date {new Date().toLocaleDateString()}</Text>
      <Card style={styles.card}>
        <CardItem>
          <View>
            {
              !isFetching
                ? renderRates()
                : <ActivityIndicator size='large' color={colors.PRIMARY_COLOR}/>
            }
          </View>
        </CardItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

Rates.propTypes = {
  exchangeRates: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = store => {
  return {
    exchangeRates: store.appReducer.exchangeRates,
    isFetching: store.appReducer.isFetching,
  };
};

export default connect(mapStateToProps)(Rates);
