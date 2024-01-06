declare type TODO = {
    title: string,
    description: string,
    startDate?: string,
    endDate?: string,
    completed: boolean
}

declare type INITIAL_BOARD = {
    active?: string
    boards: BOARD[]
}

declare type BOARD = {
    title: string,
    todos: TODO[]
    active: boolean
}

declare type ADDTODO = {
    boardTitle: string
    todo: TODO
}

declare type SELECT_BOARD = {
    key: string
}