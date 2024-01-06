/* eslint-disable no-case-declarations */
const BoardState: INITIAL_BOARD = {
    active: '',
    boards: []
}

const BoardReducers = (state=BoardState, action): INITIAL_BOARD => {
    switch(action.type) {
        case "board/add":
            const indices = state.boards.findIndex((board) => board.title==action.payload.title)
            if(indices >= 0) {
                alert('duplicate data')
                return state
            }
            return {
                ...state,
                boards: [
                    ...state.boards,
                    action.payload
                ]
            }
        case "board/select":
            const idx = state.boards.findIndex((board) => board.title === action.payload.key)

            // JSON stringify and parse it back are the hacks 
            // to copy the object on JS cause its not supported
            // like the other language
            const nState = JSON.parse(JSON.stringify(state)) as INITIAL_BOARD

            nState.active = action.payload.key
            nState.boards[idx] = {
                ...nState.boards[idx],
                active: true
            }
            
            return nState
        case "todo/add":
            const currentIdxBoard = state.boards.findIndex((board) => board.title === state.active)
            
            // JSON stringify and parse it back are the hacks 
            // to copy the object on JS cause its not supported 
            // like the other language
            const newState = JSON.parse(JSON.stringify(state)) as INITIAL_BOARD
            newState.boards[currentIdxBoard] = {
                ...newState.boards[currentIdxBoard],
                todos: [
                    ...newState.boards[currentIdxBoard].todos,
                    action.payload.todo
                ]
            }
            return newState
        case "todo/update":
            const i = state.boards.findIndex((board) => board.title === state.active)

            // JSON stringify and parse it back are the hacks 
            // to copy the object on JS cause its not supported
            // like the other language
            const ns = JSON.parse(JSON.stringify(state)) as INITIAL_BOARD

            const indexTodo = ns.boards[i].todos.findIndex((todo) => todo.title === action.payload.todo.title)
            console.log(indexTodo)
            if(indexTodo >= 0) {
                ns.boards[i].todos[indexTodo] = action.payload.todo
            }
            console.log(ns)
            return ns
        default:
            return state
    }
}

export default BoardReducers