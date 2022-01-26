import { Button, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { TTodo } from '../store/types/todo';
import CheckBox from '@react-native-community/checkbox';
//@ts-ignore
import styled from 'styled-components/native';
import Row from './Row';

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
    return (
        <Container>
            <Row>
                <CheckBox
                    value={isDone}
                    onValueChange={toggleTip}
                />
                <Text>{title}</Text>
            </Row>
            <Text>{description}</Text>
            {/* <Text>{date?.toDateString()}</Text> */}
            
            <Button onPress={deleteTip} title='Delete' color={'red'} />
        </Container>
    );
};

const Container = styled.View`
    padding: 5px;
    border-width: 1px;
    margin-bottom: 10px
`

export default Tip;