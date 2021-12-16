import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListAC, RemoveTodoListAC} from "./todo-lists-reducer";


export type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof RemoveTodoListAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case  'ADD-TODOLIST':
            return {
                ...state, [action.todoListId]: []
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todoListId
    } as const
}
export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId
    } as const
}
export const changeTaskStatusAC = (taskId: string, todoListId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        todoListId,
        isDone
    } as const
}
export const changeTaskTitleAC = (taskId: string, todoListId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        todoListId,
        title
    } as const
}
/*
export const ChangeTodoListTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}*/
