import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BarcodeMask from 'react-native-barcode-mask';

// Import AnsyncStorange
import AsyncStorage from '@react-native-community/async-storage';

// Import icons 
import IcomFeather from 'react-native-vector-icons/Feather'
import IcomIonicons from 'react-native-vector-icons/Ionicons'

// Import Components
import ItemFlatList from '../components/item_flatlist'

export default class Qrcode extends Component {

  state = {
    isModalVisible: false,
    dados: [{ key: 1, data: 'https://www.youtube.com/watch?v=oQdjFi5yJ4U', type: 'aslajsdk' }]
  };

  _listEmptyComponent = () => {
    return (
      <View>
        <Text style={{ textAlign: "center", margin: 30 }} >Sem Registros...</Text>
      </View>
    )
  }

  componentDidMount() {
    AsyncStorage.getItem('listdata').then(value => {
      this.setState({ dados: JSON.parse(value) })
    })
  }

  async InsertList(value) {

    if (value.type != null) {
      let dados = {
        key: this.state.dados.length + 1,
        data: value.data,
        type: value.type
      }

      this.setState({ dados: [...this.state.dados, dados] })
      this.setState({ isModalVisible: false })

      try {
        await AsyncStorage.setItem('listdata', JSON.stringify(this.state.dados))
      } catch (e) {
        alert(e)
      }

    }
  }

  render() {
    return (
      <View style={style.container}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={style.title}>Lista de Dados</Text>
          <FlatList
            data={this.state.dados}
            style={{ marginBottom: 20 }}
            ListEmptyComponent={this._listEmptyComponent}
            renderItem={({ item }) => <ItemFlatList data={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>

        <Modal visible={this.state.isModalVisible} animationType='slide'>
          <RNCamera
            style={{ flex: 1 }}
            ref={camera => (this.camera = camera)}
            onBarCodeRead={data => this.InsertList(data)}
            type={RNCamera.Constants.Type.back}
          >
            <BarcodeMask
              width={250}
              height={250}
              showAnimatedLine={true}
              edgeBorderWidth={5}
              edgeWidth={50}
              edgeHeight={50}
              edgeColor={'#9C27B0'} />

            <IcomIonicons
              style={style.buttonCloseModal}
              onPress={() =>
                this.setState({ isModalVisible: false })}
              name='ios-close-circle-outline'
              size={45} />

          </RNCamera>
        </Modal>

        <IcomFeather name='plus' size={30} style={style.buttonOpenModal} onPress={() => this.setState({ isModalVisible: true })} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  title: {
    fontSize: 16,
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: '#9C27B0',
    marginBottom: 15
  },
  buttonOpenModal: {
    textAlignVertical: "center",
    backgroundColor: '#9C27B0',
    color: 'white',
    width: 45,
    height: 45,
    textAlign: 'center',
    borderRadius: 22,
    position: 'absolute',
    right: 25,
    bottom: 30,
  },
  buttonCloseModal: {
    color: 'white',
    textAlign: "right",
    margin: 20,
  }
})