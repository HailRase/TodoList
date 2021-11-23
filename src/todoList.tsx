import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type todolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<taskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function TodoList(props: todolistPropsType) {


    let TaskElement = props.tasks.map(t => {
        const onRemoveHandler = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
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
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const onChangeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

    return (
        <div className="todolist">
            <Typography variant={"h6"} style={{fontWeight: "bold"}}>
                <EditableSpan title={props.title} setNewTitle={onChangeTodoListTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.id)}>
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
                    <Button color={props.filter === "all" ? "secondary" : "primary"}
                            onClick={onAllClickHandler}>All</Button>
                    <Button color={props.filter === "active" ? "secondary" : "primary"}
                            onClick={onActiveClickHandler}>Active</Button>
                    <Button color={props.filter === "completed" ? "secondary" : "primary"}
                            onClick={onCompletedClickHandler}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
