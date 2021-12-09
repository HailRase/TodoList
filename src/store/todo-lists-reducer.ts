import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string,
    todoListId: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const todoListID = action.todoListId
            const newTodoList: TodoListType = {
                id: todoListID,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        id: id
    }
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todoListId: v1()
    } as const
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}