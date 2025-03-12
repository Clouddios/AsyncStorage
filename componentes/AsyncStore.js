import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Produto from './produto';
import ListaRegistros from './ListaRegistros';

export default function Storage() {
    const [telaAtual, setTelaAtual] = useState('cadastro');
    const [registros, setRegistros] = useState([]);

    const salvarNoAsyncStorage = async (qtd, produto, valor) => {
        try {
            const registro = {
                qtd,
                produto,
                valor,
            };

            // Recupera os registros anteriores do AsyncStorage
            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];

            // Adiciona o novo registro
            registros.push(registro);

            // Armazena novamente no AsyncStorage
            await AsyncStorage.setItem('registros', JSON.stringify(registros));

            Alert.alert('Sucesso', 'Registro salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar no AsyncStorage', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
        }
    };

    const carregarRegistros = async () => {
        try {
            const registrosExistentes = await AsyncStorage.getItem('registros');
            setRegistros(registrosExistentes ? JSON.parse(registrosExistentes) : []);
        } catch (error) {
            console.error('Erro ao carregar registros do AsyncStorage', error);
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados.');
        }
    };

    const excluirRegistro = async (index) => {
        try {
            const registrosExistentes = await AsyncStorage.getItem('registros');
            let registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];

            // Remove o registro pelo índice
            registros.splice(index, 1);

            // Armazena novamente no AsyncStorage
            await AsyncStorage.setItem('registros', JSON.stringify(registros));

            // Atualiza o estado
            setRegistros(registros);

            Alert.alert('Sucesso', 'Registro excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir registro do AsyncStorage', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o registro.');
        }
    };

    return (
        <View style={styles.container}>
            {telaAtual === 'cadastro' ? (
                <Produto onSalvarDados={salvarNoAsyncStorage} setTelaAtual={() => { setTelaAtual('registros'); carregarRegistros(); }} />
            ) : (
                <ListaRegistros registros={registros} voltarParaCadastro={() => setTelaAtual('cadastro')} excluirRegistro={excluirRegistro} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    }
});