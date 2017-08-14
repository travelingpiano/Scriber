import React from 'react';
import { Provider } from 'react-redux';
import { MenuContext } from 'react-native-popup-menu';
import Routes from './src/Routes';
import configureStore from './src/store/store';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    let store = configureStore();

    return (
      <Provider store={store}>
        <MenuContext>
          <Routes />
        </MenuContext>
      </Provider>
    );
  }
}
