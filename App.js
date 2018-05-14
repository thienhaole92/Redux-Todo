import React from 'react';
import { AppRegistry } from 'react-native';
import Application from './Application';

export default class App extends React.Component {
  render() {
    return (
      <Application />
    );
  }
}

AppRegistry.registerComponent('App', () => App)
