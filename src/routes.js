import React from 'react';

// React Navigator
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['ViewPagerAndroid']);

// import pages
import qrcode from './screens/qrcode';
import barcode from './screens/barcode';

// import Components
import Status from './components/statusbar';
import About from './components/about';

const Imports = () => {
  return (
    <>
      <Status />
      <About />
    </>
  );
};

const Tab = createMaterialTopTabNavigator(
  {
    qrcode,
    barcode,
  },
  {
    tabBarOptions: {
      labelStyle: {
        color: 'black',
        fontWeight: 'bold',
      },
      style: {backgroundColor: 'white'},
      indicatorStyle: {backgroundColor: '#9C27B0'},
    },
  },
);

const Routes = createAppContainer(
  createStackNavigator({
    Tab: {
      screen: Tab,
      navigationOptions: () => ({
        title: 'QRBarCode',
        headerRight: <Imports />,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          shadowColor: 'red',
        },
        headerStyle: {backgroundColor: '#9C27B0'},
      }),
    },
  }),
);

module.exports = Routes;
console.disableYellowBox = true;
