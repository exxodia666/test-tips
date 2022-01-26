export type TTodosStore = {
    todos: TTodo[]
}

export type TTodo = {
    id: number,
    title: string,
    description: string,
    isDone: boolean,
    date: Date
}