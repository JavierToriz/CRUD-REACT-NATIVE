import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import { Button } from 'react-native-web';
import {database } from '../config/fb'; 
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { async } from '@firebase/util';

 
export default function Update({ id }) {
    const Formularo = ({ id }) {
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

        });
        useEffect((id) => {
            const db = collection(database, 'autos', id);
            db.on('value', snapshot => {
                const data = snapshot.val();
                setNewItem({
                    marca: data.marca,
                    subMarca: data.subMarca,
                    modelo: data.modelo,
                    version: data.version,
                    precio: data.precio,
                    transmision: data.transmision,
                    carroceria: data.carroceria,
                    puertas: data.puertas,
                })
                
              });
        }, [id]);

        const actualizarFormulario = () => {
            // Crear una referencia a la base de datos
            const db = collection(database, 'autos', id);
            // Actualizar los datos del formulario en la base de datos
            db.update({
                marca: marca,
                subMarca: data.subMarca,
                modelo: modelo,
                version: version,
                precio: precio,
                transmision: transmision,
                carroceria: carroceria,
                puertas: puertas,
            });
            navigation.goBack();
          };
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
                    title= 'Actualizar'
                    onPress= {actualizarFormulario}
                />
    
    
            </View>
        )
     }  
     return (
        <View contentContainerStyle={{alignItems: 'center', flex: 1}}>
            <Text style={styles.text}> Autos </Text>
            {autos.map(auto => <Formularo key={auto.id}{...auto} />)}
            <Button title='Add Screen' onPress={() => navigation.navigate('Add')} style={{fontWeight: 'bold'}}/>
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
////////
