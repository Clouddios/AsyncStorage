import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Produto from './produto';
import ListaRegistros from './ListaRegistros';

export default function Storage() {
    const [telaAtual, setTelaAtual] = useState('cadastro');
    const [registros, setRegistros] = useState([]);

    const salvarNoAsyncStorage = async (qtd, produto, valor) => {
        try {
            const registro = { qtd, produto, valor };

            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];

            registros.push(registro);

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

            registros.splice(index, 1);

            await AsyncStorage.setItem('registros', JSON.stringify(registros));
            setRegistros(registros);

            Alert.alert('Sucesso', 'Registro excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir registro do AsyncStorage', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o registro.');
        }
    };

    const excluirTodosRegistros = async () => {
        console.log('Botão "Excluir Todos os Registros" pressionado'); // Verificação
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja excluir todos os registros?',
            [
                {
                    text: 'Não',
                    onPress: () => {
                        console.log('Usuário escolheu "Não"');
                        setTelaAtual('cadastro');
                    },
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        console.log('Usuário escolheu "Sim"');
                        try {
                            await AsyncStorage.removeItem('registros');
                            setRegistros([]);
                            Alert.alert('Sucesso', 'Todos os dados foram removidos!');
                        } catch (error) {
                            console.error('Erro ao excluir todos os registros', error);
                            Alert.alert('Erro', 'Ocorreu um erro ao excluir os dados.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            {telaAtual === 'cadastro' ? (
                <Produto
                    onSalvarDados={salvarNoAsyncStorage}
                    setTelaAtual={() => {
                        setTelaAtual('registros');
                        carregarRegistros();
                    }}
                />
            ) : (
                <View style={{ flex: 1 }}>
                    {console.log('Tela de registros renderizada')} {/* Adicione este log */}
                    <ListaRegistros
                        registros={registros}
                        voltarParaCadastro={() => setTelaAtual('cadastro')}
                        excluirRegistro={excluirRegistro}
                    />
                    <TouchableOpacity
                        style={styles.deleteAllButton}
                        onPress={excluirTodosRegistros}
                    >
                        <Text style={styles.deleteAllButtonText}>Excluir Todos os Registros</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    deleteAllButton: {
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    deleteAllButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});