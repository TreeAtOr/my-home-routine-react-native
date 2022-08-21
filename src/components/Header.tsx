import { View, Text, ViewStyle, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from '../constants'
import Icon from "react-native-vector-icons/Feather";

interface IHeaderProps {
    homeName: string
    onSettingScreen: () => void,
    isUserAdmin: boolean,
    onAdminScreen: () => void
}

export default function Header({ homeName, onSettingScreen,isUserAdmin, onAdminScreen }: IHeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{homeName}</Text>
            {isUserAdmin?<TouchableOpacity style={{marginLeft: "auto", marginRight: 10}} onPress={onAdminScreen}>
                <Icon name="home" color={COLORS.black} size={25} />
            </TouchableOpacity>:null}
            <TouchableOpacity onPress={onSettingScreen}>
                <Icon name="settings" color={COLORS.black} size={25} />
            </TouchableOpacity>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
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
    title: {
        fontFamily: 'arial',
        fontWeight: '700',
        fontSize: 25,
        color: COLORS.black

    }
})