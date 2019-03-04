import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {
  CURRENCY_NAMES,
  EURO_ID,
  RUB_ID,
  USD_ID,
} from "../../utils/constants";
import { getDynamicsUri } from "../../utils/uriCreator";
import { convertToPresetFormat } from "../../utils/helpers";
import Rates from "../Rates/Rates";
import CurrencySelector from "../../components/CurrencySelector/CurrencySelector";
import CustomDatepicker from "../../components/CustomDatepicker/CustomDatepicker";
import Chart from "./Chart/Chart";

class GraphicsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyId: USD_ID,
      startDate: new Date(new Date().setDate(new Date().getDate() - 15)),
      endDate: new Date(),
      data: [],
      error: "",
    };
  }

  componentDidUpdate(prevProps, nextState) {
    const {startDate, endDate, currencyId} = this.state;
    if (startDate !== nextState.startDate ||
      endDate !== nextState.endDate ||
      currencyId !== nextState.currencyId) {
      this.getCurrencyDynamics();
    }
  }

  componentDidMount() {
    this.getCurrencyDynamics();
  }

  getCurrencyDynamics = async () => {
    const {currencyId, startDate, endDate} = this.state;
    if (new Date(startDate) > new Date(endDate)) {
      this.setState({error: "Choose dates correctly."});
      return;
    }
    if (currencyId) {
      try {
        const response = await fetch(getDynamicsUri(currencyId, convertToPresetFormat(startDate), convertToPresetFormat(endDate)));
        const json = await response.json();
        let points = [];
        json.forEach((item) => {
          points.push({x: new Date(item.Date), y: item.Cur_OfficialRate});
        });
        this.setState({data: points, error: ""});
      }
      catch (error) {
        console.log(error);
        this.setState({error: "Error while getting dynamics..."});
      }
    }
  };

  render() {
    const {
      currencyId,
      data,
      error,
      startDate,
      endDate,
    } = this.state;
    let chart = null;
    if (data.length > 1) {
      chart = <Chart data={data} />
    }

    const options = [
      {
        label: CURRENCY_NAMES.USD,
        value: USD_ID
      },
      {
        label: CURRENCY_NAMES.EUR,
        value: EURO_ID
      },
      {
        label: CURRENCY_NAMES.RUB,
        value: RUB_ID
      }
    ];

    return (
      <ScrollView style={styles.container}>
        <View style={{marginLeft: 20, marginRight: 20,}}>
          <Rates />
          <Text>Select currency...</Text>
          <CurrencySelector
            selectedValue={currencyId}
            onValueChange={(value) => { this.setState({currencyId: value})}}
            options={options}
          />
          <View style={styles.datePickersContainer}>
            <CustomDatepicker
              onDateChange={(date) => { this.setState({startDate: date})}}
              date={startDate}
            />
            <CustomDatepicker
              onDateChange={(date) => { this.setState({endDate: date})}}
              date={endDate}
            />
          </View>
          <Text style={styles.errorText}>{ error }</Text>
        </View>
        <View>
          { chart }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datePickersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
  }
});

export default GraphicsContainer;
