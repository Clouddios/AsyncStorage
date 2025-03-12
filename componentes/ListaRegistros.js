import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ListaRegistros = ({ registros, voltarParaCadastro }) => {
    return (
        <View>
            <Text>Lista de Registros</Text>
            <FlatList
                data={registros}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>Quantidade: {item.qtd}</Text>
                        <Text>Produto: {item.produto}</Text>
                        <Text>Valor: {item.valor}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={voltarParaCadastro}>
                <Text style={styles.buttonText}>Voltar para Cadastro</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default ListaRegistros;
