import { StyleSheet, Text } from 'react-native';
import React, { FC, useState } from 'react';
import { TTodo } from '../store/types/todo';
import CheckBox from '@react-native-community/checkbox';
//@ts-ignore
import styled from 'styled-components/native';
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
        <Container isDone={isDone} style={styles.shadow}>
            <Row>
                <CheckBox
                    value={isDone}
                    onValueChange={toggleTip}
                />
                <Title isDone={isDone}>
                    {title}
                </Title>
                <TouchableOpacity onPress={deleteTip}>
                    <Icon name="trash" size={25} color="red" />
                </TouchableOpacity>
            </Row>
            {showDescr &&
                <Description isDone={isDone} >{description}</Description>
            }
            <Text>{new Date(date).toDateString()}</Text>
        </Container>
    );
};

const Row = styled.View`
    flex-direction: row;
    padding-right: 5px;
    padding-left: 5px;
    align-Items: center;
    justify-Content: space-between;
`
const Description = styled.Text<{ isDone: boolean }>`
    width: 75%;
    color: ${({ isDone }) => isDone ? 'white' : 'black'};
    fontFamily: ${FONTS.regular};
    fontSize: 16px;
`

const Title = styled.Text<{ isDone: boolean }>`
    text-Decoration-Line: ${({ isDone }) => isDone ? 'line-through' : 'none'};
    width: 75%;
    color: ${({ isDone }) => isDone ? 'white' : 'black'};
    fontFamily: ${FONTS.regular};
    fontSize: 16px;
`

const Container = styled.View<{ isDone: boolean }>`
    background-Color: ${({ isDone }) => isDone ? 'green' : 'white'};
    padding: 10px;
    margin-Bottom: 10px;
    border-Radius: 5px;
`
const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 5,
    }
})

export default Tip;