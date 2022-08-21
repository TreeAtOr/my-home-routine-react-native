import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from "react-native"
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../../constants";

interface ICreateHomeModalProps {
    visable: boolean,
    setVisable: (a: boolean) => void,
    createHome: (title: string) => void
}
//@ts-nocheck
export default function CreateHomeModal({ visable, setVisable, createHome }: ICreateHomeModalProps) {
    const [title, setTitle] = useState<string>('')
    return (<Modal animationType='slide'
        transparent={true}
        visible={visable}
        onRequestClose={
            () => setVisable(false)
        }
    >
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.title]}>Create modal</Text>
                <TouchableOpacity onPress={() => setVisable(false)}>
                    <Icon name="x" size={25} />
                </TouchableOpacity>
            </View>

            <View style={styles.rowContainer}>
                <Text>Home title:</Text><TextInput style={styles.input} value={title} onChangeText={
                    (text) => setTitle(text)
                }></TextInput>
            </View>

            <TouchableOpacity onPress={()=> {
                title?createHome(title): null
                setVisable(false)
            }}>
                <Text style={styles.title}>Create home</Text>
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