import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";


import { COLORS } from "../constants";
import { IRoutine } from "../intefaces";

interface ITodoItemProps extends IRoutine {
    onPress: (id: string) => void
}

export default function TodoItem({ name, achived, id, onPress }: ITodoItemProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(id)} >
            <View style={[styles.item, { backgroundColor: achived ? COLORS.inactive : COLORS.secandory, }]}>
                <Text style={[styles.text]}>{name}</Text>
                <Icon name={!achived ? "circle" : "check"} size={20} />
            </View>
        </TouchableOpacity>
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
        justifyContent: 'space-between'
    },

    text: {
        fontFamily: 'arial',
        fontWeight: '500',
        fontSize: 20,
        textTransform: 'lowercase',
        color: COLORS.black

    }

})