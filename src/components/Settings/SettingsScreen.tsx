import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from "react-native"
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../../constants";
import ErrorScreen from "../ErrorScreen";
import CreateHomeModal from "./CreateHomeModal";

export interface ISettings {
    home_key: string;
    user_key: string;
    admin_key: string;
    admin_mode: boolean;
}

interface ISettingScreenProps {
    visable: boolean,
    setVisable: (a: boolean) => void,
    onUpdate: (s: { home_key: string, user_key: string }) => void,
    settings?: ISettings,
    setSettings: (a: ISettings) => void,
    onCreate: () => void
}

export default function SettingScreen({ visable, setVisable, onUpdate, settings, setSettings, onCreate }: ISettingScreenProps) {
    if (!settings) {
        setSettings({
            home_key: '',
            user_key: '',
            admin_key: '',
            admin_mode: false
        })
        return <ErrorScreen error={new Error('Prepering settings')} />
    }
    return (<Modal animationType='slide'
        transparent={true}
        visible={visable}
        onRequestClose={
            () => setVisable(false)
        }
    >
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.title]}>SettingScreen</Text>
                <TouchableOpacity onPress={() => {
                    setVisable(false)
                    onCreate()
                }}>
                    <Icon name="plus" size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisable(false)}>
                    <Icon name="x" size={25} />
                </TouchableOpacity>

            </View>

            <View style={styles.rowContainer}>
                <Text>Your home key:</Text><TextInput style={styles.input} value={settings.home_key} onChangeText={
                    (text) => setSettings({ ...settings, home_key: text })
                }></TextInput>
            </View>

            <View style={styles.rowContainer}>
                <Text>Your user key:</Text><TextInput style={styles.input} value={settings.user_key} onChangeText={
                    (text) => setSettings({ ...settings, user_key: text })
                }></TextInput>
            </View>

            <View style={styles.rowContainer}>
                <Text>Your admin key*:</Text><TextInput style={styles.input} value={settings.admin_key} onChangeText={
                    (text) => setSettings({ ...settings, admin_key: text })
                }></TextInput>
            </View>

            <View style={styles.rowContainer}>
                <Text>Admin mode:</Text><Switch style={{ marginHorizontal: 'auto', marginVertical: 12 }} value={settings.admin_mode} onValueChange={
                    (value) => setSettings({ ...settings, admin_mode: value })
                } />
            </View>

            <TouchableOpacity style={styles.bottom} onPress={() => {
                setVisable(false)
                onUpdate(settings)
            }}>
                {/*<Text style={styles.title}>Update Settings</Text>*/}
            </TouchableOpacity>

        </View>
    </Modal>)
}

const styles = StyleSheet.create({
    rowContainer: {
        width: '100%',
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
    },
    input: {
        width: '50%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    header: {
        width: '100%',
        backgroundColor: COLORS.primaly,
        paddingHorizontal: 35,
        paddingTop: 45,
        paddingBottom: 20,

        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottom: {
        marginTop: 'auto',
        marginBottom: 50
    },
    title: {
        fontFamily: 'arial',
        fontWeight: '700',
        fontSize: 25,
        color: COLORS.black

    }
});