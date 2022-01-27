import { createReducer } from "@reduxjs/toolkit"
import { addTodo, deleteTodo, toggleTodo } from "../actions/todo"
import { TTodosStore } from "../types/todo"

const initialState: TTodosStore = {
    todos: []
}

export const todoReducer = createReducer(initialState, (builder) => {

    builder
        .addCase(addTodo, (state, { payload }) => {
            console.log(state);
            return {
                todos: [...state.todos, {
                    id: state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 0,
                    title: payload.title,
                    description: payload.description,
                    date: payload.date,
                    isDone: false
                }]
            }
        })
        .addCase(toggleTodo, (state, { payload }) => {
            console.log(state);
            return {
                todos: [...state.todos].map(
                    e => e.id === payload.id
                        ? { ...e, isDone: payload.value }
                        : e
                )
            }
        })
        .addCase(deleteTodo, (state, { payload }) => {
            console.log(state);
            return {
                todos: [...state.todos].filter(
                    e => e.id !== payload.id
                )
            }
        })
    // .addCase(decrement, (state, action) => {
    //     state.value--
    // })
    // .addCase(incrementByAmount, (state, action) => {
    //     state.value += action.payload
    // })
})