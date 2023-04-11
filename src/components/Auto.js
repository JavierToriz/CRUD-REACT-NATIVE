import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { database } from '../config/fb';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query, querySnapshot } from 'firebase/firestore';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

export default function Auto(props) {
    
   
    const navigation = useNavigation();
    const [autos, setAutos] = React.useState([]); 
    
    React.useEffect(() => {
        const collectionRef = collection(database, 'autos');
        const q = query(collectionRef)
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setAutos(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    marca: doc.data().marca,
                    subMarca: doc.data().subMarca,
                    modelo: doc.data().modelo,
                    version: doc.data().version,
                    precio: doc.data().precio,
                    transmision: doc.data().transmision,
                    carroceria: doc.data().carroceria,
                    puertas: doc.data().puertas,
                }))
            )
        })
        return unsuscribe;
    },[])

    const onDelete = () => {
        const collectionRef = collection(database, 'autos')
        const q = doc(collectionRef, props.id)
        deleteDoc(q);
    }
    
    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                
                <AntDesign onPress={onDelete} name="delete" size={34}/>
            </View>
            <Text style={styles.text2}>Marca:  {props.marca}</Text>
            <Text style={styles.text2}>SubMarca:  {props.subMarca}</Text>
            <Text style={styles.text2}>Modelo:  {props.modelo}</Text>
            <Text style={styles.text2}>Version:  {props.version}</Text>
            <Text style={styles.text2}>Precio:  {props.precio}</Text>
            <Text style={styles.text2}>Transmision:  {props.transmision}</Text>
            <Text style={styles.text2}>Carroceria:  {props.carroceria}</Text>
            <Text style={styles.text2}>Puertas:  {props.puertas}</Text>

            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Update', {id: props.id })}} >
                
                <Text style={{color: 'white', fontWeight: 'bold'}}>Actualizar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 16,
        padding: 16
    },
    button: {
        backgroundColor: '#0FA5E9' ,
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'   
    },
    text1: {
        fontSize: 32,
        fontWeight: 'bold'

    },
    text2: {
        fontSize: 26,
        fontWeight: '500',
    }

}) 
