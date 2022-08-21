import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants';

interface ITemplateAddButtonProps {
    onAdd: () => void
}

export default function TemplateAddButton({ onAdd }: ITemplateAddButtonProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.item, {  }]}>
                <Text style={[styles.text]}>Add new Template</Text>
                <TouchableOpacity onPress={onAdd} >
                    <Icon name={"plus"} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        paddingHorizontal: 20,
        marginVertical: 8,
    },
    item: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 10,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: COLORS.primaly,
        borderWidth: 3,
        borderStyle: "solid"
        
    },

    text: {
        fontFamily: 'arial',
        fontWeight: '500',
        fontSize: 20,
        textTransform: 'lowercase',
        color: COLORS.black

    }

})
