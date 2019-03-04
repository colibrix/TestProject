import React from 'react';
import {
  createBottomTabNavigator  ,
  createAppContainer,
} from 'react-navigation';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from "../../utils/colors";
import { getExchangeRates } from "../../actions/AppActions";
import { Header, Icon } from "react-native-elements";
import { displayName } from '../../../app';
import { TAB_NAVIGATION_ICON_SIZE } from "../../utils/constants";
import Comparison from "../Comparison/Comparison";
import Home from "../Home/Home";
import Graphics from "../Graphics/Graphics";
import Converter from "../Converter/Converter";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='home'
            type='foundation'
            size={TAB_NAVIGATION_ICON_SIZE}
            color={tintColor}
          />
        ),
      },
    },
    Graphics: {
      screen: Graphics,
      navigationOptions: {
        tabBarLabel: 'Graphics',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='graph-trend'
            type='foundation'
            size={TAB_NAVIGATION_ICON_SIZE}
            color={tintColor}
          />
        ),
      },
    },
    Converter: {
      screen: Converter,
      navigationOptions: {
        tabBarLabel: 'Converter',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='dollar'
            type='foundation'
            size={TAB_NAVIGATION_ICON_SIZE}
            color={tintColor}
          />
        ),
      },
    },
    Comparison: {
      screen: Comparison,
      navigationOptions: {
        tabBarLabel: 'Comparison',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='clipboard-notes'
            type='foundation'
            size={TAB_NAVIGATION_ICON_SIZE}
            color={tintColor}
          />
        ),
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.PRIMARY_COLOR,
    }
  }
);

const AppWithTabNavigator = createAppContainer(TabNavigator);

class App extends React.Component {
  componentDidMount() {
    this.props.getExchangeRatesAction(new Date());
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={colors.PRIMARY_COLOR}
          centerComponent={{
            text: displayName,
            style: { color: '#fff' }
          }}
        />
        <AppWithTabNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const mapDispatchToProps = dispatch => {
  return {
    getExchangeRatesAction: date => dispatch(getExchangeRates(date)),
  };
};

const mapStateToProps = store => {
  return {
    exchangeRates: store.appReducer.exchangeRates
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
