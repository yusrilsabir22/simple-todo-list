const AddBoard = (payload: BOARD) => {
    return {
        type: "board/add",
        payload
    }
}

const SelectBoard = (payload: SELECT_BOARD) => {
    return {
        type: "board/select",
        payload
    }
}

export {
    AddBoard,
    SelectBoard
}