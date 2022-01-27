import { StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, FC, Ref, SetStateAction, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Row from './Row';
import { FONTS } from '../config';
//@ts-ignore
import styled from 'styled-components/native';
import { Header } from 'react-native/Libraries/NewAppScreen';

type BottomSheetComponentsProps = {
    bottomSheetRef: Ref<BottomSheet>,
    handleSheetChanges: (index: number) => void,
    handleClosePress: () => void
    onAddTip: () => void
    title: string,
    settitle: Dispatch<SetStateAction<string>>
    description: string,
    setdescription: Dispatch<SetStateAction<string>>,
    date: Date,
    setOpen: (val: boolean) => void

}

const BottomSheetComponent: FC<BottomSheetComponentsProps> = ({
    bottomSheetRef,
    handleSheetChanges,
    handleClosePress,
    onAddTip,
    settitle,
    description,
    setdescription,
    title,
    date,
    setOpen
}) => {

    const snapPoints = useMemo(() => ['1%', '75%'], []);

    return (
        <BottomSheet
            style={styles.shadow}
            enablePanDownToClose
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <HeaderContainer>
                <HeaderText>ДОБАВИТЬ ЗАМЕТКУ</HeaderText>
            </HeaderContainer>

            <View style={styles.contentContainer}>
                <TextInputComponent
                    value={title}
                    placeholder='Заголовок'
                    onChangeText={settitle}
                />
                <TextInputComponent
                    value={description}
                    placeholder='Описание'
                    onChangeText={setdescription}
                />
                <DateRow>
                    <DateText>{date.toDateString()}</DateText>
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={{ padding: 10 }}>
                        <SelectDateText>Выбрать</SelectDateText>
                    </TouchableOpacity>
                </DateRow>
                <AddButton onPress={onAddTip}>
                    <AddButtonText>Добавить</AddButtonText>
                </AddButton>
            </View>
        </BottomSheet>
    );
};

export default BottomSheetComponent;


const HeaderContainer = styled.View`
    align-Items: center;
    justify-Content: center;
    width: 100%;
    padding-right: 10px;
    padding-left: 10px;
    height: 50px;
`
const HeaderText = styled.Text`
    font-Family: ${FONTS.semibold};
    font-Size: 18px;
`
const TextInputComponent = styled.TextInput`
    font-Family: ${FONTS.regular};
    font-Size: 16px
    border-Bottom-Width: 0.5px;
    border-Color: grey;
    width: 90%;
    padding: 10px;            
`

const SelectDateText = styled.Text`
    font-Family: ${FONTS.semibold};
    font-Size: 16px;
    color: green;                    
`
const DateText = styled.Text`
    font-Family: ${FONTS.regular};
    font-Size: 16px;
    padding: 10px;                  
`
const DateRow = styled.View`
    flex-direction: row;
    justify-Content: space-between;
    border-Bottom-Width: 0.5px;
    border-Color: grey;
    width: 90%;
    margin-Bottom: 20px;
`

const AddButton = styled.TouchableOpacity`
    border-Radius: 10px;
    padding: 10px;
    background-Color: green;
`
const AddButtonText = styled.Text`
    font-Family: ${FONTS.semibold}; 
    font-Size: 16px;
    color: white; 
`

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        paddingTop: 70,
        flex: 1,
        padding: 24,
        //backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});
