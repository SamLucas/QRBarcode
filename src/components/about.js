import React, {Component} from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Import icons
import IcomFontAwesome from 'react-native-vector-icons/FontAwesome';
import IcomIonicons from 'react-native-vector-icons/Ionicons';

// import Modal from "react-native-modal"
import Modal from 'react-native-modal';

export default class About extends Component {
  state = {
    isModalVisible: false,
    dados: [],
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          style={style.container_icon}
          onPress={() =>
            this.setState({isModalVisible: !this.state.isModalVisible})
          }>
          <IcomFontAwesome name="info" style={style.iconOpen} />
        </TouchableOpacity>

        <Modal isVisible={this.state.isModalVisible}>
          <IcomIonicons
            name="ios-close-circle-outline"
            style={style.iconClose}
            onPress={() =>
              this.setState({isModalVisible: !this.state.isModalVisible})
            }
          />

          <IcomFontAwesome name="info" style={style.iconInfo} />

          <View style={style.container}>
            <Text style={style.title}>Sobre</Text>
            <Text style={style.text}>
              O objetivo desta ferramenta além de estudar conceitos novos como
              AsyncStorage, Modal, BarcodeMask entre outros é tratar códigos de
              barras ou QRcode com o react para comparar a velocidade dos dois
              em um conjunto de amostra.
            </Text>

            <Text style={style.title_dev}>Desenvolvedores</Text>
            <Text
              style={style.dev}
              onPress={() => Linking.openURL('https://github.com/SamLucas')}>
              Samuel Lucas
            </Text>
            <Text
              style={style.dev}
              onPress={() =>
                Linking.openURL('https://github.com/SauloDesenvolvedor')
              }>
              Saulo
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container_icon: {
    marginTop: 2,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  iconOpen: {
    color: 'white',
    fontSize: 22,
  },
  iconClose: {
    // marginRight: 20,
    // color: 'white',
    // fontSize: 40,
    // justifyContent: "flex-end"
    textAlignVertical: 'center',
    color: '#9C27B0',
    width: 60,
    height: 60,
    textAlign: 'center',
    borderRadius: 22,
    position: 'absolute',
    right: 10,
    top: 80,
    fontSize: 45,
  },
  iconInfo: {
    fontSize: 80,
    width: 80,
    height: 80,
    borderRadius: 50,
    color: 'white',
    backgroundColor: '#9C27B0',
    marginBottom: -80,
    zIndex: 1,
  },
  container: {
    height: 300,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    marginLeft: 70,
    marginTop: 20,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: 'black',
    padding: 20,
    textAlign: 'center',
    textAlign: 'justify',
  },
  title_dev: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  dev: {
    marginLeft: 20,
    color: '#9C27B0',
    fontWeight: 'bold',
  },
});
