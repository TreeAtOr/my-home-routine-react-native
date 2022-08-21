import { UseMutationResult } from "react-query"
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import TodoItem from "../TodoItem"
import { COLORS } from "../../constants"
import { IRoutine, ITemplate } from "../../intefaces"
import TemplateItem from "./TemplateItem"
import TemplateAddButton from "./TemplateAddButton"
import CreateTemplateModal from "./CreateTemplateModal"
import { useState } from "react"

interface ITemplateScreenProps {
    data?: string[],
    removeMutation: UseMutationResult<Response, unknown, ITemplate, unknown>
    addMutation: UseMutationResult<Response, unknown, any, unknown>
}
export function TemplateScreen({ data, removeMutation, addMutation }: ITemplateScreenProps) {
    const [CTMVisable, setCTMVisable] = useState(false)

    if (!data) return (<View style={styles.container}>
        <Text style={styles.title}>
            Admin key is Incorect
        </Text>
    </View>
    )
    return (<ScrollView style={[styles.list,]}>
        {data?.map(str => JSON.parse(str)).map((item: ITemplate) => <TemplateItem {...item} key={item.id}
            onDelete={(_id) => {
                removeMutation.mutate(item)
            }}
        />)}
        <CreateTemplateModal visable={CTMVisable} setVisable={setCTMVisable} addTemplate={(val) => {
            addMutation.mutate(val)
            setCTMVisable(false)
        }} />
        <TemplateAddButton onAdd={() => setCTMVisable(true)} />
    </ScrollView>)
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: COLORS.background,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '100%'
    },
    title: {
        fontFamily: 'arial',
        fontWeight: '700',
        fontSize: 25,
        color: COLORS.black
    }
})