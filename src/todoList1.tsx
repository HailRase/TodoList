import React, {ChangeEvent} from "react";
import {TodoListType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./store/todo-lists-reducer";


export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
}
export type FilterValuesType = "all" | "active" | "completed"

export function TodoList1(props: PropsType) {

    const todoLists = useSelector<AppRootStateType, TodoListType>(state => state.todoLists
        .filter(todoList => todoList.id === props.todoListId)[0])

    const tasks = useSelector<AppRootStateType, taskType[]>(state => state.tasks[props.todoListId])

    const dispatch = useDispatch()

    let taskForRender: Array<taskType> = tasks;
    if (todoLists.filter === "active") {
        taskForRender = tasks.filter(t => !t.isDone);
    }

    if (todoLists.filter === "completed") {
        taskForRender = tasks.filter(t => t.isDone);
    }

    let TaskElement = taskForRender.map(t => {
        const onRemoveHandler = () => {
            dispatch(removeTaskAC(t.id, props.todoListId))
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(t.id, props.todoListId, e.currentTarget.checked))
        const changTitle = (title: string) => dispatch(changeTaskTitleAC(t.id,props.todoListId, title ))
        return (
            <ListItem
                disableGutters
                className={t.isDone ? "is-done" : ""}
                key={t.id}
                divider
                style={{padding: "0px", display: "flex", justifyContent: "space-between"}}
            >
                <Checkbox
                    onChange={changeStatus}
                    color={"primary"}
                    checked={t.isDone}
                />
                <EditableSpan title={t.title} setNewTitle={changTitle}/>
                <IconButton onClick={onRemoveHandler} size={"small"}>
                    <Delete fontSize={"small"}/>
                </IconButton>
            </ListItem>
        )
    })

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todoListId))
    }
    const onAllClickHandler = () => dispatch(ChangeTodoListFilterAC(props.todoListId, 'all'))
    const onActiveClickHandler = () => dispatch(ChangeTodoListFilterAC(props.todoListId, 'active'))
    const onCompletedClickHandler = () => dispatch(ChangeTodoListFilterAC(props.todoListId, 'completed'))
    const onChangeTodoListTitle = (title: string) => {
        dispatch(ChangeTodoListTitleAC(props.todoListId, title))
    }




    /*const allBtnClass = filter === "all" ? "active-filter" : ""
    const activeBtnClass = filter === "active" ? "active-filter" : ""
    const completedBtnClass = filter === "completed" ? "active-filter" : ""*/

    return (
        <div className="todolist">
            <Typography variant={"h6"} style={{fontWeight: "bold"}}>
                <EditableSpan title={todoLists.title} setNewTitle={onChangeTodoListTitle}/>
                <IconButton onClick={() => RemoveTodoListAC(props.todoListId)}>
                    <Delete/>
                </IconButton>
            </Typography>

            <AddItemForm addItem={addTask}/>

            <List>
                {TaskElement}
            </List>
            <div className="btn">
                <ButtonGroup
                    variant={"contained"}
                    size={"small"}
                    disableElevation
                    style={{display: "flex", justifyContent: "space-between"}}
                >
                    <Button color={todoLists.filter === "all" ? "secondary" : "primary"}
                            onClick={onAllClickHandler}>All</Button>
                    <Button color={todoLists.filter === "active" ? "secondary" : "primary"}
                            onClick={onActiveClickHandler}>Active</Button>
                    <Button color={todoLists.filter === "completed" ? "secondary" : "primary"}
                            onClick={onCompletedClickHandler}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
