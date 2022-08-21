import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";


import { COLORS } from "../../constants";
import { ITemplate } from "../../intefaces";

interface ITemplateItemProps extends ITemplate {
    onDelete: (id: number) => void
}

export default function TemplateItem({ text, id,onDelete }: ITemplateItemProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.item, { backgroundColor: COLORS.secandory, }]}>
                <Text style={[styles.text]}>{text}</Text>
                <TouchableOpacity onPress={() => onDelete(id)} >
                    <Icon name={"minus"} size={20} />
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