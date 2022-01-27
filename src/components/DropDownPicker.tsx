import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FONTS } from '../config';
import { TVariant, TVariantObj } from '../screens/HomeScreen';
//@ts-ignore
import styled from 'styled-components/native';

type TPickerProps = {
    variants: { label: string, value: TVariant }[];
    selectedVariant: TVariantObj
    setSelectedVariant: (variant: TVariantObj) => void
}

const Picker: FC<TPickerProps> = ({
    variants,
    selectedVariant,
    setSelectedVariant
}) => {
    const [opened, setOpened] = useState(false);

    const toggleFilter = (e: TVariantObj) => {
        setSelectedVariant(e)
        setOpened(false);
    }

    return (
        <View style={{ marginBottom: 10, }}>
            <TouchableOpacity onPress={() => setOpened((val) => !val)}>
                <Container>
                    <Text>{selectedVariant.label}</Text>
                    <Icon
                        name={`chevron-${!opened ? "down" : 'up'}`}
                        size={20}
                        color="grey"
                    />
                </Container>
            </TouchableOpacity>
            {opened && variants.map(e => <TouchableOpacity
                key={e.value}
                onPress={() => toggleFilter(e)}
            >
                <ListItem>
                    <Text>{e.label}</Text>
                    <Icon
                        name={`list`}
                        size={20}
                        color="grey"
                    />
                </ListItem>
            </TouchableOpacity>)
            }
        </View>
    );
};

export default Picker;

const Text = styled.Text`
    font-Family: ${FONTS.regular};
    font-Size: 16;                
`
const ListItem = styled.View`
    flex-direction: row;
    justify-Content: space-between;
    background-Color: white;
    padding: 10px;
    border-Radius: 2px;
    border-Bottom: 1px;
    
`
const Container = styled.View`
    flex-direction: row;
    justify-Content: space-between;
    background-Color: white;
    padding: 10px;
    margin-Bottom: 10px;
    border-Radius: 2px;
    elevation: 5;
`
const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 5,
    }
});
