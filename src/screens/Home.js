import * as React from 'react';
import {Text, View, Button, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database, db } from '../config/fb';
import { collection, onSnapshot, orderBy, query, querySnapshot } from 'firebase/firestore';
import Auto from '../components/Auto';

export default function Home() {

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

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', flex: 1}}>
            <Text style={styles.text}> Autos </Text>
            {autos.map(auto => <Auto key={auto.id}{...auto} />)}
            <Button title='Agregar nuevo' onPress={() => navigation.navigate('Add')} style={{fontWeight: 'bold'}}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontSize: 32,
        fontWeight: '700'

    },
}) 