import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
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
    dados: []
  };

  _listEmptyComponent = () => {
    return (
      <View>
        <Text style={{ textAlign: "center", margin: 30 }} >Sem Registros...</Text>
      </View>
    )
  }

  async clearlist() {
    await this.setState({ dados: [] })
    try {
      await AsyncStorage.setItem('listbarcode', JSON.stringify(this.state.dados))
    } catch (e) {
      alert(e)
    }
  }

  deleteItemById = id => {
    const data_sem_o_id = this.state.dados.filter(item => item.id != id)
    this.setState({ dados: data_sem_o_id })
  }

  componentDidMount() {
    AsyncStorage.getItem('listbarcode').then(value => {
      if (value != null) {
        this.setState({ dados: JSON.parse(value) })
      }
    })
  }

  async InsertList(value) {

    if (value.type != null) {
      let dados = {
        key: this.state.dados.length + 1,
        data: value.data,
        type: value.type
      }

      await this.setState({ dados: [...this.state.dados, dados] })
      this.setState({ isModalVisible: false })

      try {
        await AsyncStorage.setItem('listbarcode', JSON.stringify(this.state.dados))
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
            renderItem={({ item }) => <ItemFlatList data={item} antigo={Qrcode} />}
            keyExtractor={(item, index) => index.toString()}
          />

          {this.state.dados.length ? (
            <TouchableOpacity style={style.buttonClearList} onPress={() => this.clearlist()}>
              <Text style={style.textButtonClearList}>Limpar Lista</Text>
            </TouchableOpacity>
          ) : null}

        </ScrollView>

        <Modal visible={this.state.isModalVisible} animationType='slide'>
          <RNCamera
            style={{ flex: 1 }}
            ref={camera => (this.camera = camera)}
            onBarCodeRead={data => this.InsertList(data)}
            type={RNCamera.Constants.Type.back}
          >
            <BarcodeMask
              width={150}
              height={Dimensions.get('window').height}
              showAnimatedLine={false}
              edgeBorderWidth={0} />

            <IcomIonicons
              style={style.buttonCloseModal}
              onPress={() =>
                this.setState({ isModalVisible: !this.state.isModalVisible })}
              name='ios-close-circle-outline'
              size={45} />

          </RNCamera>
        </Modal>

        <IcomFeather name='plus' size={30} style={style.buttonOpenModal} onPress={() => this.setState({ isModalVisible: !this.state.isModalVisible })} />

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
  buttonClearList: {
    backgroundColor: '#9C27B0',
    margin: 10,
    padding: 10,
    borderRadius: 4,
  },
  textButtonClearList: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
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
  textinfo: {
    color: 'white',
    transform: [{ rotate: '90deg' }],
    fontSize: 14,
    position: "absolute",
    bottom: 20,
    left: 0
  },
  buttonCloseModal: {
    color: '#9C27B0',
    textAlign: "right",
    margin: 20,
    position: 'absolute',
    right: 10,
    bottom: 10,
  }
})