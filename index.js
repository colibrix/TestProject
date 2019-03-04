/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import App from './src/containers/App/App';
import { name as appName } from './app.json';
import { Provider } from "react-redux";
import { store } from "./src/store/configureStore";
import React from "react";

class AppWithStore extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


AppRegistry.registerComponent(appName, () => AppWithStore);
