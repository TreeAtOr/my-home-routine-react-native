import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from "react-native"
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../../constants";
import { ITemplate, repeatSchemas } from "../../intefaces";
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from "@react-native-picker/picker";

type RawTemplate = { text: string, repeat: repeatSchemas }

interface ICreateTemplateModalProps {
    visable: boolean,
    setVisable: (a: boolean) => void,
    addTemplate: (a: RawTemplate) => void
}

const emptyTemplate: RawTemplate = {
    text: '',
    repeat: 'd'
}
//@ts-nocheck
export default function CreateTemplateModal({ visable, setVisable, addTemplate }: ICreateTemplateModalProps) {
    const [template, setTemplate] = useState<RawTemplate>(emptyTemplate)
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
                <Text>Template text:</Text><TextInput style={styles.input} value={template.text} onChangeText={
                    (text) => setTemplate({ ...template, text: text })
                }></TextInput>
            </View>

                
            <View style={styles.rowContainer}>
                <Text>Template text:</Text>
                <RNPickerSelect onValueChange={
                    (value) => setTemplate({ ...template, repeat: value })
                } value={template.repeat}
                items={[
                    {label: 'Daily', value:'d'},
                    {label: 'Weekly', value:'w'},
                    {label: 'Monthly', value:'m'},

                ]}/>
            </View>
             <TouchableOpacity onPress={()=> {
                addTemplate(template)
                setTemplate(emptyTemplate)
            }}>
                <Text style={styles.title}>Create template</Text>
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