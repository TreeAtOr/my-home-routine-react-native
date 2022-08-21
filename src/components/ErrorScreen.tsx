import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { COLORS } from '../constants';
import Header from './Header'

interface IErrorScreenProps {
    error: Error
}

export default function ErrorScreen({ error }: IErrorScreenProps) {
    return <>
        <View style={styles.container}>
            <Text style={styles.title}>An Error has accured</Text>
            <Text>{error.message}</Text>
        </View>
    </>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center'
    },
    title: {
        fontFamily: 'arial',
        fontWeight: '700',
        fontSize: 25,
        color: COLORS.black

    }
})