import React, { useEffect, useState } from 'react'

import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native'
import colors from '../styles/colors'
import { Header } from '../components/Header'
import fonts from '../styles/fonts'
import { EnviromenButton } from '../components/EnviromentButton'
import api from '../services/api'
import { PlantCardPrimary } from '../components/PlantCardPrimary'


import { Load } from '../components/Load'
import { useNavigation } from '@react-navigation/core'
import { PlantsProps } from '../libs/storage'
interface EnvsProps {
    key: string,
    title: string
}

export function PlantSelect() {
    const [envs, setEnvs] = useState<EnvsProps[]>([])
    const [plants, setPlants] = useState<PlantsProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const navigation = useNavigation();





    const [envSelected, setEnvSelected] = useState('all')

    function handleEnviromentSelected(env: string) {
        setEnvSelected(env)

        if (env === 'all') return setFilteredPlants(plants)

        const filtered = plants.filter(plant => plant.environments.includes(env))

        setFilteredPlants(filtered)
    }
    useEffect(() => {
        async function fetchEnv() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')
            setEnvs([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ])
        }
        fetchEnv()
    }, [])

    function handleFetchMore(distance: number) {
        if (distance < 1)
            return
        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
        if (!data) {
            return setLoading(true)

        }

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])

        } else {
            setPlants(data)
            setFilteredPlants(data)
        }
        setLoading(false)
        setLoadingMore(false)
    }
    useEffect(() => {
        fetchPlants()
    }, [])

    function handlePlantSelect(plant: PlantsProps) {
        navigation.navigate('PlantSave', { plant })
    }

    if (loading)
        return <Load />
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
            </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
            </Text>
            </View>
            <View>
                <FlatList data={envs}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromenButton title={item.title} active={item.key === envSelected} onPress={() => handleEnviromentSelected(item.key)} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.envList}
                />

            </View>
            <View style={styles.plants}>
                <FlatList data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />

                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green} /> : <></>

                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    envList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32
    },

})