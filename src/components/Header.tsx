import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import userImg from '../assets/fodidos.png'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Header() {
    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        async function loadStorageUsername() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUsername(user || '')
        }
        loadStorageUsername()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>Olá</Text>
                <Text style={styles.name}>{username}</Text>
            </View>

            <Image style={styles.img} source={userImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greetings: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    name: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 40
    }
})