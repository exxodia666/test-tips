import { Alert, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../store/store';
import { addTodo, deleteTodo, toggleTodo } from '../store/actions/todo';
import Tip from '../components/Tip';
import AddButton from '../components/AddButton';
import Picker from '../components/DropDownPicker';
import DatePickerComponent from '../components/DatePicker';
import BottomSheetComponent from '../components/BottomSheetComponent';
import SearchInput from '../components/SearchInput';
import { FlatList } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';

export type TVariant = 'all' | 'completed' | 'inprogress';

export type TVariantObj = {
    value: TVariant,
    label: string
}

const HomeScreen = () => {

    const rotation = useSharedValue(0);

    const dispatch = useDispatch();

    const variants: TVariantObj[] = [{
        label: 'Все',
        value: 'all'
    }, {
        label: 'Завершенные',
        value: 'completed'
    }, {
        label: 'В процессе',
        value: 'inprogress'
    }];

    const [selectedVariant, setSelectedVariant] = useState(variants[0]);

    const { todos } = useTypedSelector(state => state.todo);

    const [query, setQuery] = useState('');

    const searchedTips = useMemo(
        () => todos
            .filter(({ isDone }) =>
                selectedVariant.value == 'all'
                    ? true
                    : selectedVariant.value == 'completed'
                        ? isDone
                        : !isDone
            )
            .filter(e => e.title.toLowerCase().includes(query.toLowerCase()))
        , [selectedVariant, todos, query]
    );

    const [date, setDate] = useState(new Date());
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');

    const bottomSheetRef = useRef<BottomSheet>(null);

    const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);

    const handleSheetChanges = useCallback((index: number) => {
        setBottomSheetIndex(index);
    }, []);

    const [open, setOpen] = useState(false)

    const handleClosePress = () => bottomSheetRef?.current?.close()

    const handleOpenPress = () => bottomSheetRef?.current?.expand()

    const onAddTip = () => {
        if (!title.length || !description.length) {
            Alert.alert('Введите заголовок и описание заметки!');
            return
        }
        dispatch(addTodo({ title, description, date }));
        setdescription('');
        settitle('');
        setDate(new Date());
        handleClosePress();
        rotation.value = withTiming(0);
    }
    const onDeleteTip = (id: number) => {
        dispatch(deleteTodo({ id }));
    }

    const onToggleTip = (id: number, value: boolean) => {
        dispatch(toggleTodo({ id, value }));
    }

    const handlePress = () => {
        bottomSheetIndex === -1
            ? handleOpenPress()
            : handleClosePress()
    }

    return (
        <View style={styles.container}>
            <SearchInput
                setQuery={setQuery}
                query={query}
            />
            <AddButton
                rotation={rotation}
                bottomSheetIndex={bottomSheetIndex}
                handleOpenPress={handlePress}
            />
            <Picker
                variants={variants}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
            />
            <FlatList
                data={searchedTips}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Tip
                    key={item.id}
                    onDeleteTip={onDeleteTip}
                    onToggleTip={onToggleTip}
                    {...item}
                />}
            />
            <DatePickerComponent
                open={open}
                setDate={setDate}
                setOpen={setOpen}
                date={date}
            />
            <BottomSheetComponent
                setOpen={setOpen}
                date={date}
                bottomSheetRef={bottomSheetRef}
                handleSheetChanges={handleSheetChanges}
                handleClosePress={handleClosePress}
                onAddTip={onAddTip}
                settitle={settitle}
                description={description}
                setdescription={setdescription}
                title={title}
            />
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

