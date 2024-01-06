const AddTodo = (payload: ADDTODO) => {
    return {
        type: "todo/add",
        payload
    }
}

const updateTodo = (payload: ADDTODO) => {
    return {
        type: "todo/update",
        payload
    }
}

export {
    AddTodo,
    updateTodo
}