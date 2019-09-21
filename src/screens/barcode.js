import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <RNCamera
          style={{flex: 1}}
          ref={camera => (this.camera = camera)}
          type={RNCamera.Constants.Type.back}
        />
      </View>
    );
  }
}
