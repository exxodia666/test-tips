import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { TTodo } from '../store/types/todo';
import CheckBox from '@react-native-community/checkbox';
//@ts-ignore
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FONTS } from '../config';
import {
    GestureDetector,
    Swipeable
} from 'react-native-gesture-handler';

type TTipProps = TTodo & {
    onToggleTip: (id: number, value: boolean) => void
    onDeleteTip: (id: number) => void
}

const Tip: FC<TTipProps> = ({
    id, description, date, title,
    isDone, onToggleTip, onDeleteTip
}) => {

    const toggleTip = (value: boolean) => {
        onToggleTip(id, value)
    }
    const deleteTip = () => {
        onDeleteTip(id)
    }

    const leftAction = () => <DeleteButton onPress={deleteTip}>
        <Icon name="trash" size={25} color="red" />
    </DeleteButton>

    return (<GestureDetector>
        <Swipeable renderLeftActions={leftAction}>
            <Container isDone={isDone} style={styles.shadow}>
                <DateText isDone={isDone}>
                    {new Date(date).toDateString()}
                </DateText>
                <Row>
                    <CheckBox
                        tintColors={{ true: 'white' }}
                        style={{ flex: 1 / 10 }}
                        value={isDone}
                        onValueChange={toggleTip}
                    />
                    <Title isDone={isDone}>
                        {title}
                    </Title>
                </Row>
                <Description isDone={isDone}>
                    {description}
                </Description>
            </Container>
        </Swipeable>
    </GestureDetector>);
};


const DeleteButton = styled.TouchableOpacity`
    width: 100%;
    justify-Content: center;
    align-Items: center;
    height: 90px;
`

const Row = styled.View`
    flex-direction: row;
    padding-right: 5px;
    padding-left: 5px;
    align-Items: center;
    justify-Content: space-between;
`
const DateText = styled.Text<{ isDone: boolean }>`
    ${/**@ts-ignore */''};
    color: ${({ isDone }) => isDone ? 'white' : 'grey'};
    font-Family: ${FONTS.regular};
    font-Size: 12px;
`

const Description = styled.Text<{ isDone: boolean }>`
    //border-width: 1;
    width: 75%;
    ${/**@ts-ignore */''};
    color: ${({ isDone }) => isDone ? 'white' : 'black'};
    font-Family: ${FONTS.regular};
    font-Size: 16px;
`

const Title = styled.Text<{ isDone: boolean }>`
    flex: ${9 / 10};
    //border-width: 1;
    ${/**@ts-ignore */''};
    text-Decoration-Line: ${({ isDone }) => isDone ? 'line-through' : 'none'};
    width: 75%;
    ${/**@ts-ignore */''};
    color: ${({ isDone }) => isDone ? 'white' : 'black'};
    font-Family: ${FONTS.regular};
    font-Size: 16px;
`

const Container = styled.View<{ isDone: boolean }>`
    //border-width: 1;
    ${/**@ts-ignore */''};
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