import React, { useState } from 'react'
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import wateringImg from '../assets/watering.png'
import { Button } from '../components/button'
import colors from '../styles/colors'
export function Welcome() {
    const [visible, setVisible] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas {'\n'}
                de forma fácil
            </Text>
            <Image style={styles.image} source={wateringImg} />
            <Text style={styles.subtitle}>Não esqueça de aprender bem redux, redux saga e codar todos os dias para voce nao sair da Superlogica, vc precisa arrumar o audio e o jitsi meet</Text>
            <Button title={'>'} />

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
    },

    image: {
        width: 292,
        height: 294
    },

})