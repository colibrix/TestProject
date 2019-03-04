import React from 'react';
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { findDifference } from "../../utils/helpers";
import Rates from "../Rates/Rates";
import DifferenceTable from "./ComparisonTable/Table";

class ComparisonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['%'],
      tableTitle: [],
      tableData: [],
      isGenerated: false,
    }
  }

  getPercentageDifference = () => {
    const { exchangeRates } = this.props;
    const { tableHead, tableTitle, tableData } = this.state;
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
    });
  };

  componentDidMount() {
    this.getPercentageDifference();
  }

  render() {
    const { tableHead, tableData, tableTitle, isGenerated } = this.state;
    const { isFetching } = this.props;
    return (
      <View style={styles.container}>
        <Rates />
        {
          isGenerated && !isFetching ?
            <React.Fragment>
              <Text style={{marginBottom: 10}}>For date: {new Date().toDateString()}</Text>
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

const mapStateToProps = store => {
  return {
    exchangeRates: store.appReducer.exchangeRates,
    isFetching: store.appReducer.isFetching,
  };
};

export default connect(mapStateToProps)(ComparisonContainer);
