import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Header from './components/Header';
import SettingScreen, { ISettings } from './components/Settings/SettingsScreen';
import { COLORS } from './constants';

import {
    useQuery,
    useQueryClient,
    useMutation,
} from 'react-query'
import { TodoScreen } from './components/TodoScreen';
import ErrorScreen from './components/ErrorScreen';
import LoadingScreen from './components/LoadingScreen';
import { IRoutine, ITemplate } from './intefaces';
import { TemplateScreen } from './components/Admin/TemplateScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateHomeModal from './components/Settings/CreateHomeModal';
const APP_SERVER = 'http://192.168.0.116:7200'

function fetchQuery(path: string, query: object, options: RequestInit = {}) {
    return fetch(APP_SERVER + path + '?' + new URLSearchParams({ ...query }), options)
}

async function queryRequest(path: string, query: object, method: string = 'GET') {
    const res = await fetchQuery(path, query, { method })
    return await res.json()
}

export function Main() {
    const queryClient = useQueryClient()
    const [intervalMs, setIntervalMs] = useState(5000)
    const [activeScreen, setActiveScreen] = useState<'normal' | 'admin'>("normal")
    const [SettingScreenVisable, setSettingScreenVisable] = useState(false)

    const [creationMenuVisable, setCreationMenuVisable] = useState<boolean>(false)

    const [settings, setSettings] = useState<ISettings>()

    useEffect(() => {
        AsyncStorage.getItem('settings').then((res) => {
            console.log('Reading from Async storage', res);
            if (!res) return setCreationMenuVisable(true)
            setSettings(JSON.parse(res))
        })
    }, [])

    useEffect(() => {
        console.log('Writing to async storage', settings);
        if (settings) AsyncStorage.setItem('settings', JSON.stringify(settings))
    }, [settings])

    const homeQuery = useQuery<string, Error>('home', () => queryRequest('/home', {
        home_key: settings!.home_key
    }), { enabled: !!settings })

    const { status, data, error } = useQuery<IRoutine[], Error>('todos', () => queryRequest('/home/routines', {
        home_key: settings!.home_key
    }), { refetchInterval: intervalMs, enabled: !!settings })

    const adminQuery = useQuery<any, Error>('admin', () => queryRequest('/admin', {
        home_key: settings!.home_key,
        admin_key: settings!.admin_key,
    }), { enabled: !!settings && settings.admin_mode })


    const achiveMutation = useMutation<Response, unknown, IRoutine, unknown>(
        value => queryRequest('/home/routines/achive', {
            home_key: settings!.home_key,
            user_key: settings!.user_key,
            rid: value.id
        }, 'POST'), {
        onSuccess: () => queryClient.invalidateQueries('todos'),
    })

    const removeMutation = useMutation<Response, unknown, ITemplate, unknown>(
        value => queryRequest('/admin/remove', {
            home_key: settings!.home_key,
            user_key: settings!.user_key,
            admin_key: settings!.admin_key,
            tid: value.id
        }, 'POST'), {
        onSuccess: () => queryClient.invalidateQueries('admin'),
    })

    const addMutation = useMutation<Response, unknown, ITemplate, unknown>(
        value => queryRequest('/admin/add', {
            home_key: settings!.home_key,
            admin_key: settings!.admin_key,
            repeat: value.repeat,
            text: value.text
        }, 'POST'), {
        onSuccess: () => queryClient.invalidateQueries('admin'),
    })

    const createHome = (value: string) => {
        queryRequest('/home', {
            title: value,
        }, 'POST')
            .then((home: any) => {
                console.log(home);

                setSettings({
                    home_key: home.home_key,
                    admin_key: home.admin_key,
                    admin_mode: true,
                    user_key:
                        settings?.user_key ? settings.user_key : 'anonimous'
                })
                queryClient.invalidateQueries('home')
            })


    }

    return (
        <View style={styles.container}>
            <SettingScreen
                visable={SettingScreenVisable}
                setVisable={setSettingScreenVisable}
                settings={settings}
                setSettings={setSettings}
                onCreate={() => setCreationMenuVisable(true)}
                onUpdate={settings => queryClient.invalidateQueries('todos')
                } />
            <CreateHomeModal
                visable={creationMenuVisable}
                setVisable={setCreationMenuVisable}
                createHome={createHome}
            />
            <Header
                homeName={homeQuery.data ? homeQuery.data : 'Searching home'}
                isUserAdmin={!!settings && settings.admin_mode}
                onAdminScreen={() => setActiveScreen(activeScreen === "admin" ? "normal" : "admin")}
                onSettingScreen={() => setSettingScreenVisable(true)} />
            {settings ? activeScreen === "normal" || !settings.admin_mode ?
                status === "loading" ? <LoadingScreen /> :
                    status === "error" ? <ErrorScreen error={error} /> :
                        status === "success" ?
                            <TodoScreen data={data} statusMutation={achiveMutation} /> :
                            <LoadingScreen /> :
                <TemplateScreen
                    data={adminQuery.data?.templates}
                    removeMutation={removeMutation}
                    addMutation={addMutation} /> :

                <ErrorScreen error={new Error("Can not create home")} />}


            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    list: {
        flex: 1,
        backgroundColor: COLORS.background,
        width: '100%',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
