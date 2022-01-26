import { Button, StyleSheet, Text, TouchableOpacityBase, View } from 'react-native';
import React, { FC, useState } from 'react';
import { TTodo } from '../store/types/todo';
import CheckBox from '@react-native-community/checkbox';
//@ts-ignore
import styled from 'styled-components/native';
import Row from './Row';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FONTS } from '../config';

type TTipProps = TTodo & {
    onToggleTip: (id: number, value: boolean) => void
    onDeleteTip: (id: number) => void
}

const Tip: FC<TTipProps> = ({ id, description, date, title, isDone, onToggleTip, onDeleteTip }) => {
    const toggleTip = (value: boolean) => {
        onToggleTip(id, value)
    }
    const deleteTip = () => {
        onDeleteTip(id)
    }

    const [showDescr, setShowDescr] = useState(false);

    return (
        <View style={{
            backgroundColor: isDone ? 'green' : 'white',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 0,
            elevation: 5,
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
        }}>
            <Row style={{
                paddingHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'space-between',
                // borderWidth: 1,
                // width: '85%',
                // padding: 10,
                // height: 50,
                // marginBottom: 10,
            }}>
                <CheckBox
                    value={isDone}
                    onValueChange={toggleTip}
                />
                <Text style={{
                    textDecorationLine: isDone ? 'line-through' : 'none',
                    width: '75%',
                    color: isDone ? 'white' : 'black',
                    fontFamily: FONTS.regular,
                    fontSize: 16,
                }}>
                    {title}
                </Text>
                <TouchableOpacity onPress={deleteTip}>
                    <Icon name="trash" size={25} color="red" />
                </TouchableOpacity>
            </Row>
            {showDescr && <Text>{description}</Text>}
            {/* <Text>{date?.toDateString()}</Text> */}
        </View>
    );
};

const Container = styled.View`
    `

export default Tip;