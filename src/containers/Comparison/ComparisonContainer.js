import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  findDifference,
  getCurrencyRateOnDate,
} from "../../utils/helpers";
import DifferenceTable from "./ComparisonTable/Table";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import {RateRepresentation} from "../Rates/Rate/RateRepresentation";
import CustomDatepicker from "../../components/CustomDatepicker/CustomDatepicker";

class ComparisonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      tableTitle: [],
      tableData: [],
      isGenerated: false,
      currentDate: new Date(),
      exchangeRates: null,
    }
  }

  getPercentageDifference = (date) => {
    getCurrencyRateOnDate(date).then( exchangeRates => {
      let tableHead = ['%'];
      let tableTitle = [];
      let tableData = [];

      let rates = [];
      for (const [currency, rate] of Object.entries(exchangeRates)) {
        rates.push({
          currency,
          rate,
        });
        tableTitle.push(currency);
      }

      tableHead.push(...tableTitle);
      const ratesCount = rates.length;
      for (let i = 0; i < ratesCount; i++) {
        let array = [];
        for (let j = 0; j < ratesCount; j++) {
          const a = rates[i];
          const b = rates[j];
          array.push(findDifference(b.rate, a.rate).toFixed(4));
        }
        tableData.push(array);
      }

      this.setState({
        tableHead: tableHead,
        tableTitle: tableTitle,
        tableData: tableData,
        isGenerated: true,
        exchangeRates: exchangeRates,
      });
    }).catch(error => this.setState({isGenerated: false}));
  };

  componentDidMount() {
    this.getPercentageDifference(new Date());
  }

  render() {
    const { tableHead, tableData, tableTitle, isGenerated, exchangeRates } = this.state;
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
        {
          isGenerated ?
            <React.Fragment>
              <View style={{marginBottom: 10, marginTop: 10,}}>
                <CustomDatepicker
                  onDateChange={nextDate => {this.setState({currentDate: nextDate})}}
                  date={this.state.currentDate}
                />
                <PrimaryButton
                  onPress={() => { this.getPercentageDifference(this.state.currentDate)}}
                  label="Calculate"
                  style={{width: '45%'}}
                />
              </View>
              {renderRates()}
              <DifferenceTable
                tableData={tableData}
                tableHead={tableHead}
                tableTitle={tableTitle}
              />
            </React.Fragment>
            : <Text style={styles.textError}>No data</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textError: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});

export default ComparisonContainer;
