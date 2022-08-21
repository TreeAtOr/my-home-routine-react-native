import { UseMutationResult } from "react-query"
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import TodoItem from "./TodoItem"
import { COLORS } from "../constants"
import { IRoutine } from "../intefaces"
import React from "react"

interface ITodoScreenProps {
    data: IRoutine[],
    statusMutation: UseMutationResult<Response, unknown, IRoutine, unknown>
}
export function TodoScreen({ data, statusMutation }: ITodoScreenProps) {
    if(data?.length != 0) return (<ScrollView style={[styles.list,]}>
        {data?.map((item) => <TodoItem {...item} key={item.id} onPress={(_id) => {
            statusMutation.mutate(item)
        }} />)}
    </ScrollView>)

    return ( <View style={styles.conatainer}>
        <Text style={styles.title}>You have no routines today</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: COLORS.background,
        width: '100%',
    },
    conatainer: {
        width: '100%',
        height: '88%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'arial',
        fontWeight: '700',
        fontSize: 25,
        color: COLORS.black
    }
})