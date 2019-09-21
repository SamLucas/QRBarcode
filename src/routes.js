import React from 'react-native';

// React Navigator 
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

// import pages
import qrcode from './screens/qrcode'
import barcode from './screens/barcode'

const Tab = createBottomTabNavigator({
  qrcode,
  barcode
})

const Routes = createAppContainer(
  createStackNavigator({
    Tab: {
      screen: qrcode,
      navigationOptions: () => ({
        title: 'Barcode',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          shadowColor: 'red',
        },
        headerStyle: { backgroundColor: '#9C27B0' },
      })
    },
  })
)

module.exports = Routes