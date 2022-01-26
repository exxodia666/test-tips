import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Button, TextInput } from 'react-native';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../store/store';
import { addTodo, deleteTodo, toggleTodo } from '../store/actions/todo';
import Tip from '../components/Tip';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Row from '../components/Row';

const HomeScreen = () => {

    const dispatch = useDispatch()

    const { todos } = useTypedSelector(state => state.todo);

    const [query, setQuery] = useState('');
    const searchedTips = useMemo(() => todos.filter(e => e.title.includes(query)), [query, todos])

    const [date, setDate] = useState(new Date())
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['1%', '75%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleClosePress = () => bottomSheetRef?.current?.close()

    const handleOpenPress = () => bottomSheetRef?.current?.expand()

    const onAddTip = () => {
        dispatch(addTodo({ title, description, date }));
    }
    const onDeleteTip = (id: number) => {
        dispatch(deleteTodo({ id }));
    }

    const onToggleTip = (id: number, value: boolean) => {
        dispatch(toggleTodo({ id, value }));
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handleOpenPress}
                style={{
                    top: 70,
                    right: 0,
                    position: 'absolute',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    //borderWidth: 1,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    //borderRadius: 25
                }}>
                <Text>+</Text>
            </TouchableOpacity>

            <TextInput
                style={{ borderWidth: 1, width: '80%', padding: 10, height: 50, marginBottom: 10, }}
                placeholder='Search'
                onChangeText={setQuery}
            />


            <ScrollView>
                <View>
                    {searchedTips?.map(e => <Tip
                        key={e.id}
                        onDeleteTip={onDeleteTip}
                        onToggleTip={onToggleTip}
                        {...e}
                    />
                    )}
                </View>

            </ScrollView>
            <BottomSheet
                enablePanDownToClose
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <Button title="Close" onPress={handleClosePress} />
                <View style={styles.contentContainer}>
                    <TextInput
                        style={{ borderBottomWidth: 1, width: '90%', padding: 10 }}
                        placeholder='Title'
                        onChangeText={settitle}
                    />
                    <TextInput
                        style={{ borderBottomWidth: 1, width: '90%', padding: 10 }}
                        placeholder='Description'
                        onChangeText={setdescription}
                    />
                    <DatePicker
                        date={date}
                        onDateChange={setDate}
                    />
                    <Button
                        title="Add"
                        onPress={onAddTip}
                    />
                </View>
            </BottomSheet>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
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

