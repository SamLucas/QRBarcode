import { Alert } from 'react-native';

export const deleteItemById = key => {
    return () => {
        Alert.alert('Aviso', key)
        // const data_sem_o_id = this.state.dados.filter(item => item.key != key)
        // this.setState({ dados: data_sem_o_id })
    }
}

export const test = key => {
    return () => {
        alert('testado!')
    }
};