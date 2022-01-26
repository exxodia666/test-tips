import { createAction } from "@reduxjs/toolkit";

export const addTodo = createAction<{
    title: string,
    description: string,
    date: Date
}, "ADD_TODO">("ADD_TODO");

export const deleteTodo = createAction<{
    id: number,
}, "DELETE_TODO">("DELETE_TODO");

export const toggleTodo = createAction<{
    id: number,
    value: boolean
}, "TOGGLE_TODO">("TOGGLE_TODO");