import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Row from './Row';
import { FONTS } from '../config';
import { TVariants } from '../screens/HomeScreen';

type TPickerProps = {
    variants: TVariants[];
    selectedVariant: TVariants
    setSelectedVariant: (variant: TVariants) => void
}

const Picker: FC<TPickerProps> = ({ variants, selectedVariant, setSelectedVariant }) => {
    const [opened, setOpened] = useState(false);

    const toggleFilter = (e: TVariants) => {
        setSelectedVariant(e)
        setOpened(false);
    }

    return (
        <View style={{ marginBottom: 10, }}>
            <TouchableOpacity onPress={() => setOpened((val) => !val)}>
                <Row style={{
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 1,
                    elevation: 5,
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 2,
                }}>
                    <Text style={{
                        fontFamily: FONTS.regular,
                        fontSize: 16,
                    }}>
                        {selectedVariant}
                    </Text>

                    <Icon name={`chevron-${!opened ? "down" : 'up'}`} size={20} color="grey" />
                </Row>
            </TouchableOpacity>
            {opened && variants.map(e => <TouchableOpacity onPress={() => toggleFilter(e)}>
                <Row style={{
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    // shadowColor: "#000",
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 1,
                    // },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 3.84,
                    // elevation: 5,
                    padding: 10,
                    //marginBottom: 10,
                    borderRadius: 2,
                    borderBottom: 1
                }}>
                    <Text style={{
                        fontFamily: FONTS.regular,
                        fontSize: 16,
                    }}>
                        {e}
                    </Text>

                    <Icon name={`list`} size={20} color="grey" />
                </Row>
            </TouchableOpacity>)
            }
        </View>
    );
};

export default Picker;

const styles = StyleSheet.create({});
