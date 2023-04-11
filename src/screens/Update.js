import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import { Button } from 'react-native-web';
import {database } from '../config/fb'; 
import { collection, addDoc, doc, docs,updateDoc, query, onSnapshot, querySnapshot, getDoc,data, where} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { async } from '@firebase/util';
import { useRoute } from '@react-navigation/native';
import Auto from '../components/Auto';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



export default function Update(
   props

) {    
    const navigation = useNavigation(); 
    const route = useRoute();
    const id = route.params?.id;
    const [newItem, setNewItem] = React.useState({
        id: '',
        marca: '',
        subMarca: '',
        modelo: '',
        version: '',
        precio: 0,
        transmision: '',
        carroceria: '',
        puertas: '',

    })
    
    const getAuto = async(id) => {
        const collectionRef = collection(database, 'autos')
        const q = doc(collectionRef, id)
        await getDoc(q).then((doc) => {
           setNewItem(doc.data())
         } );
             
    }

    useEffect(() => {
        getAuto(props.route.params.id)
    }, [])
    

    const onEdit = () => {
        const collectionRef = collection(database, 'autos')
        const q = doc(collectionRef, id)
        updateDoc(q, {
            marca: newItem.marca,
            subMarca: newItem.subMarca,
            modelo: newItem.modelo,
            version: newItem.version,
            precio: newItem.precio,
            transmision: newItem.transmision,
            carroceria: newItem.carroceria,
            puertas: newItem.puertas,
        })
        navigation.goBack();}

    
        
    

    
    
    
    return  (
        <View>
            
    
                <Text style={styles.text}> Editar auto </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Marca'
                    value={newItem.marca}
                    onChangeText={(text) => setNewItem({...newItem, marca:text})}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='SubMarca'
                    value={newItem.subMarca}
                    onChangeText={(text) => setNewItem({...newItem, subMarca:text})}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Modelo'
                    value={newItem.modelo}
                    onChangeText={(text) => setNewItem({...newItem, modelo:text})}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Version'
                    value={newItem.version}
                    onChangeText={(text) => setNewItem({...newItem, version:text})}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Precio'
                    value={newItem.precio}
                    onChangeText={(text) => setNewItem({...newItem, precio:text})}
                    keyboardType="number-pad"
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Transmision'
                    value={newItem.transmision}
                    onChangeText={(text) => setNewItem({...newItem, transmision:text})}
                    
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Carroceria'
                    value={newItem.carroceria}
                    onChangeText={(text) => setNewItem({...newItem, carroceria:text})}
                    
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Puertas'
                    value={newItem.puertas}
                    onChangeText={(text) => setNewItem({...newItem, puertas:text})}

                />
                <Button
                    title= 'Actualizar'
                    onPress= {onEdit}
                    
                />   
    
        </View>
      );
    };
    


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
