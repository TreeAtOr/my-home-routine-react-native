import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { COLORS } from '../constants';
import Header from './Header'

interface ILoadingProps {
}

export default function LoadingScreen({  }: ILoadingProps) {
    return <>
        <View style={styles.container}>
            <Text style={styles.title}>Connecting to home...</Text>
        </View>
    </>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        fontFamily: 'arial',
        fontWeight: '700',
        fontSize: 25,
        color: COLORS.black
    }
})