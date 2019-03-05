import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import {
  CURRENCY_NAMES,
} from "../../utils/constants";
import Rates from "../Rates/Rates";
import NumericInput from "../../components/NumericInput/NumericInput";

class ConverterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      USD: '',
      EUR: '',
      RUB: '',
      BYN: '',
    };
  }

  handleOnAnyCurrencyChange = (currencyValue, currencyName) => {
    const currencyNames = Object.keys(CURRENCY_NAMES);
    let otherCurrencies =
      currencyNames.filter(name => name !== currencyName);
    this.calculateRates(currencyName, currencyValue, otherCurrencies);
  };

  calculateRates = (currencyName, currencyValue, otherCurrencies) => {
    const regexp = /^\d*\.?\d*$/;
    if (currencyValue === "" || currencyValue === ".") {
      this.setState({
        [currencyName]: '',
      });
    } else if (regexp.test(currencyValue)) {
      const { exchangeRates } = this.props;
      let nextExchangeValues = {};
      if (currencyName !== CURRENCY_NAMES.BYN) {
        const calculatedRate = parseFloat(currencyValue) * exchangeRates[currencyName];
        otherCurrencies.forEach((currency) => {
          nextExchangeValues[currency] = this.calculateNewRate(calculatedRate, exchangeRates[currency]);
        });
      } else {
        otherCurrencies.forEach((currency) => {
          nextExchangeValues[currency] = this.calculateNewRate(currencyValue, exchangeRates[currency]);
        });
      }
      this.setState({
        [currencyName]: currencyValue,
        ...nextExchangeValues,
      });
    }
  };

  calculateNewRate = (value, rate) => {
    if (rate) {
      return (value / rate).toFixed(4);
    }
    return value.toFixed(4);
  };

  render() {
    const {
      USD,
      EUR,
      RUB,
      BYN,
    } = this.state;
    const { isFetching } = this.props;
    return (
      <View style={styles.container}>
        {
          !isFetching ?
            <View style={styles.wrapper}>
              <Text style={{marginBottom: 10, fontSize: 12, fontStyle: 'italic'}}>
                You can print only numbers and delimiter 'dot' for float numbers.
              </Text>
              <NumericInput
                currencyName={CURRENCY_NAMES.USD}
                onChangeText={this.handleOnAnyCurrencyChange}
                value={USD}
              />
              <NumericInput
                currencyName={CURRENCY_NAMES.EUR}
                onChangeText={this.handleOnAnyCurrencyChange}
                value={EUR}
              />
              <NumericInput
                currencyName={CURRENCY_NAMES.RUB}
                onChangeText={this.handleOnAnyCurrencyChange}
                value={RUB}
              />
              <NumericInput
                currencyName={CURRENCY_NAMES.BYN}
                onChangeText={this.handleOnAnyCurrencyChange}
                value={BYN}
              />
            </View>
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
  wrapper: {
    marginTop: 20,
  }
});

const mapStateToProps = store => {
  return {
    exchangeRates: store.appReducer.exchangeRates,
    isFetching: store.appReducer.isFetching,
  }
};

export default connect(mapStateToProps)(ConverterContainer);
