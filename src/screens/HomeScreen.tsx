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
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Row from '../components/Row';
import { FONTS } from '../config';
import AddButton from '../components/AddButton';
import Picker from '../components/DropDownPicker';

export type TVariants = 'all' | 'completed' | 'inprogress';

const HomeScreen = () => {

    const dispatch = useDispatch();

    const variants: TVariants[] = ['all', 'completed', 'inprogress'];

    const [selectedVariant, setSelectedVariant] = useState(variants[0]);

    const { todos } = useTypedSelector(state => state.todo);

    const [query, setQuery] = useState('');

    const searchedTips = useMemo(
        () => todos
            .filter(({ isDone }) =>
                selectedVariant == 'all' ? true : selectedVariant == 'completed' ? isDone : !isDone
            )
            .filter(e => e.title.includes(query))
        , [selectedVariant, todos, query]
    );

    const [date, setDate] = useState(new Date())
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['1%', '75%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

    const [open, setOpen] = useState(false)

    const handleClosePress = () => bottomSheetRef?.current?.close()

    const handleOpenPress = () => bottomSheetRef?.current?.expand()

    const onAddTip = () => {
        dispatch(addTodo({ title, description, date }));
        setdescription('');
        settitle('');
        setDate(new Date());
        handleClosePress();
    }
    const onDeleteTip = (id: number) => {
        dispatch(deleteTodo({ id }));
    }

    const onToggleTip = (id: number, value: boolean) => {
        dispatch(toggleTodo({ id, value }));
    }

    return (
        <View style={styles.container}>
            <AddButton handleOpenPress={handleOpenPress} />

            <Row style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation: 5,

                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                //borderWidth: 1,
                width: '85%',
                padding: 10,
                height: 50,
                marginBottom: 20,
            }}>
                <TextInput
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: 16,
                        width: '80%',
                    }}
                    placeholder='Search'
                    onChangeText={setQuery}
                />
                <Icon name="search" size={20} color="grey" />
            </Row>

            <Picker
                variants={variants}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
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
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
                enablePanDownToClose
                ref={bottomSheetRef}
                index={- 1
                }
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <Row style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    //borderWidth: 1,
                    width: '100%',
                    paddingHorisontal: 10,
                    height: 50,
                    //marginBottom: 10,
                }}>
                    <Text style={{
                        fontFamily: FONTS.semibold,
                        fontSize: 18
                    }}>{'Добавить дело'.toUpperCase()}</Text>

                    <TouchableOpacity
                        onPress={handleClosePress}
                        style={{
                            // backgroundColor: 'white',
                            // shadowColor: "#000",
                            // shadowOffset: {
                            //     width: 0,
                            //     height: 2,
                            // },
                            // shadowOpacity: 0.25,
                            // shadowRadius: 3.84,

                            // elevation: 5,
                            // top: 70,
                            right: 0,
                            position: 'absolute',
                            // borderTopLeftRadius: 25,
                            // borderBottomLeftRadius: 25,
                            // borderLeftWidth: 1,
                            // borderBottomWidth: 1,
                            // borderTopWidth: 1,
                            // //borderWidth: 1,
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            //borderRadius: 25
                        }}>
                        <Icon name="close" size={25} color="red" />
                    </TouchableOpacity>
                </Row>

                <View style={styles.contentContainer}>
                    <TextInput
                        style={{
                            fontFamily: FONTS.regular,
                            fontSize: 16,
                            borderBottomWidth: 0.5,
                            borderColor: 'grey',
                            width: '90%',
                            padding: 10
                        }}
                        placeholder='Title'
                        onChangeText={settitle}
                    />
                    <TextInput
                        style={{
                            fontFamily: FONTS.regular,
                            fontSize: 16,
                            borderBottomWidth: 0.5,
                            borderColor: 'grey',
                            width: '90%',
                            padding: 10
                        }}
                        placeholder='Description'
                        onChangeText={setdescription}
                    />
                    <Row style={{
                        justifyContent: 'space-between',
                        borderBottomWidth: 0.5,
                        borderColor: 'grey',
                        width: '90%',
                        marginBottom: 20,
                    }}>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: 16,
                                padding: 10
                            }}>{date.toDateString()}</Text>

                        <TouchableOpacity
                            onPress={() => setOpen(true)}
                            style={{
                                //borderRadius: 10,
                                padding: 10,
                                //backgroundColor: 'green'
                            }}>
                            <Text style={{
                                fontFamily: FONTS.semibold,
                                fontSize: 16,
                                color: 'green',
                                //height: 20,
                            }}>Выбрать</Text>
                        </TouchableOpacity>
                    </Row>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <TouchableOpacity
                        onPress={onAddTip}
                        style={{
                            borderRadius: 10,
                            padding: 10,
                            backgroundColor: 'green'
                        }}>
                        <Text style={{ fontFamily: FONTS.semibold, fontSize: 16, color: 'white' }}>Добавить</Text>
                    </TouchableOpacity>
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

