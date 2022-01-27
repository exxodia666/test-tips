import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
//@ts-ignore
import styled from 'styled-components/native';
import Animated, {
    SharedValue,
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';

type TAddButtonProps = {
    rotation: SharedValue<number>;
    bottomSheetIndex: number,
    handleOpenPress: () => void
};

const AddButton: FC<TAddButtonProps> = ({ bottomSheetIndex, handleOpenPress, rotation }) => {

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
        };
    });

    const handleOnPress = () => {
        handleOpenPress();
        bottomSheetIndex === -1
            ? rotation.value = withTiming(45)
            : rotation.value = withTiming(0)
    };

    return (
        <Container onPress={handleOnPress} style={styles.shadow}>
            <Animated.View style={[animatedStyle]}>
                <Icon
                    size={25}
                    name={"plus"}
                    color={bottomSheetIndex === -1 ? "green" : "red"}
                />
            </Animated.View>
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
