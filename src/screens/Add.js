import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import { Button } from 'react-native-web';
import {database } from '../config/fb'; 
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Add() {
    const navigation = useNavigation(); 
    const [newItem, setNewItem] = React.useState({
        marca: '',
        subMarca: '',
        modelo: '',
        version: '',
        precio: 0,
        transmision: '',
        carroceria: '',
        puertas: '',

    })
    const onSend = async() => {
        await addDoc(collection(database, 'autos'), newItem)
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Agregar nuevo auto </Text>
            <TextInput 
                style={styles.input}
                placeholder='Marca'
                onChangeText={(text) => setNewItem({...newItem, marca:text})}
            />
            <TextInput 
                style={styles.input}
                placeholder='SubMarca'
                onChangeText={(text) => setNewItem({...newItem, subMarca:text})}
            />
            <TextInput 
                style={styles.input}
                placeholder='Modelo'
                onChangeText={(text) => setNewItem({...newItem, modelo:text})}
            />
            <TextInput 
                style={styles.input}
                placeholder='Version'
                onChangeText={(text) => setNewItem({...newItem, version:text})}
            />
            <TextInput 
                style={styles.input}
                placeholder='Precio'
                onChangeText={(text) => setNewItem({...newItem, precio:text})}
                keyboardType="number-pad"
            />
            <TextInput 
                style={styles.input}
                placeholder='Transmision'
                onChangeText={(text) => setNewItem({...newItem, transmision:text})}
                
            />
            <TextInput 
                style={styles.input}
                placeholder='Carroceria'
                onChangeText={(text) => setNewItem({...newItem, carroceria:text})}
                
            />
            <TextInput 
                style={styles.input}
                placeholder='Puertas'
                onChangeText={(text) => setNewItem({...newItem, puertas:text})}

            />
            <Button
                title= 'Agregar'
                onPress= {onSend}
            />


        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: "black",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '90%'
    },
    text: {
        fontSize: 32,
        fontWeight: '700'

    }
}) 