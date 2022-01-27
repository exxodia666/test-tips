import { StyleSheet, TextInput, View } from 'react-native';
import React, { Dispatch, FC, SetStateAction } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
//@ts-ignore
import styled from 'styled-components/native';
import { FONTS } from '../config';

const SearchInput: FC<{
    query: string,
    setQuery: Dispatch<SetStateAction<string>>
}> = ({ query, setQuery }) => {
    return (
        <Row style={styles.shadow}>
            <TextInputComponent
                style={styles.textInput}
                value={query}
                placeholder='search...'
                onChangeText={setQuery}
            />
            <IconContainer>
                <Icon name="search" size={20} color="grey" />
            </IconContainer>
        </Row>
    );
};

export default SearchInput;

const TextInputComponent = styled.TextInput`
    font-Family: ${FONTS.regular};
    font-Size: 16px;
    border-Radius: 10px;
    padding-Left: 10px;
    text-Align-Vertical: center;
    width: 80%
`
const IconContainer = styled.View`
    height: 50px;
    width: 50px;
    justify-Content: center;
    align-Items: center
`
const Row = styled.View`
    flex-direction: row;
    background-Color: white;
    border-Radius: 10px;
    align-Items: center;
    justify-Content: space-between;
    width: 85%;
    height: 50px;
    margin-Bottom: 20px
`

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 5,
    },
    textInput: {
        fontFamily: FONTS.semibold,
        /* borderRadius: 10,
        paddingLeft: 10,
        textAlignVertical: 'center',
        fontSize: 14,
        width: '80%', */
    }
});
