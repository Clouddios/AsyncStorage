import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function Produto({ onSalvarDados, setTelaAtual }) {
    const [qtd, setQTD] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');

    const handleSalvar = () => {
        if (qtd && produto && valor) {
            onSalvarDados(qtd, produto, valor);
            setProduto('');
            setValor('');
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        }
    };

    const limparCampos = () => {
        setQTD('');
        setProduto('');
        setValor('');
    };

    return (
        <View style={estilos.container}>
            <View style={estilos.inputRow}>
                <Text style={estilos.label}>Quantidade: </Text>
                <TextInput
                    value={qtd}
                    onChangeText={setQTD}
                    style={[estilos.input, { width: '25%' }]}
                    maxLength={6}
                    keyboardType='numeric'
                />
            </View>
            <View style={estilos.inputRow}>
                <Text style={estilos.label}>Produto:</Text>
                <TextInput
                    value={produto}
                    onChangeText={setProduto}
                    style={estilos.input}
                    placeholder="Nome do Produto"
                    maxLength={20}
                />
            </View>
            <View style={estilos.inputRow}>
                <Text style={estilos.label}>Valor :</Text>
                <TextInputMask
                    type={'money'}
                    value={valor}
                    onChangeText={setValor}
                    style={estilos.input}
                    placeholder="Valor do Produto"
                    maxLength={10}
                    keyboardType="numeric"
                />
            </View>
            <Text style={estilos.label}>Quantidade: {qtd}</Text>
            <Text style={estilos.label}>Produto: {produto}</Text>
            <Text style={estilos.label}>Valor: {valor}</Text>
            <View style={estilos.inputRow}>
                <TouchableOpacity style={[estilos.botao, { margin: 10 }]} onPress={limparCampos}>
                    <Text style={estilos.botaoTexto}>Limpar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[estilos.botao, { margin: 10 }]} onPress={handleSalvar}>
                    <Text style={estilos.botaoTexto}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[estilos.botao, { margin: 10 }]} onPress={() => setTelaAtual('registros')}>
                    <Text style={estilos.botaoTexto}>Ver Registros Salvos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 25
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%',
        justifyContent: 'flex-end'
    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '80%',
        marginBottom: -10,
        marginLeft: 5,
        borderRadius: 5,
        marginTop: 15
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20
    },
    botao: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        margin: 10
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 18
    },
    cabecalho: {
        marginTop: 10, // Corrigido para ser um número
        marginBottom: 40, // Corrigido para ser um número
        fontSize: 20,
        fontStyle: 'italic'
    }
});
