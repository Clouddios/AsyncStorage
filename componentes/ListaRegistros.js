import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ListaRegistros = ({ registros, voltarParaCadastro, excluirRegistro }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lista de Registros</Text>
            <FlatList
                data={registros}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text>Quantidade: {item.qtd}</Text>
                        <Text>Produto: {item.produto}</Text>
                        <Text>Valor: {item.valor}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => excluirRegistro(index)}>
                            <Text style={styles.buttonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={[styles.button]} onPress={voltarParaCadastro}>
                <Text style={styles.buttonText}>Voltar para Cadastro</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        width: '100%' // Garantir que o item ocupe toda a largura disponível
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 10,
        width: '100%' // Garantir que o botão ocupe toda a largura disponível
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '100%' // Garantir que o botão ocupe toda a largura disponível
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default ListaRegistros;
