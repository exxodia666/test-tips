import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
//@ts-ignore
import styled from 'styled-components/native';

type TAddButtonProps = {
    handleOpenPress: () => void
}
const AddButton: FC<TAddButtonProps> = ({ handleOpenPress }) => {
    return (
        <Container onPress={handleOpenPress} style={styles.shadow}>
            <Icon name="plus" size={25} color="green" />
        </Container>
    );
};

export default AddButton;

const Container = styled.TouchableOpacity`
    background-Color: white;
    top: 70px;
    right: 0px;
    position: absolute;
    border-Top-Left-Radius: 25px;
    border-Bottom-Left-Radius: 25px;
    width: 50px;
    height: 50px;
    justify-Content: center;
    align-Items: center;
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
    }
});
