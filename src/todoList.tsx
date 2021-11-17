import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
        const changTitle = (title: string) =>  props.changeTaskTitle(t.id, title, props.id)
        return <li className={t.isDone ? "is-done" : ""} key={t.id}>
            <input
                onChange={changeStatus}
                type="checkbox"
                checked={t.isDone}
            />
            <EditableSpan title={t.title} setNewTitle={changTitle}/>
            <button onClick={onRemoveHandler}>x</button>
        </li>
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
            <h3>
                <EditableSpan title={props.title} setNewTitle={onChangeTodoListTitle}/>
                <button onClick={() => props.removeTodoList(props.id)}>x</button>
            </h3>
            {/*<div>
                <input
                    className={error ? "error" : ""}
                    value={newTaskTitle}
                    onChange={onChangeTitleHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>*/}
            <AddItemForm addItem={addTask}/>

            <ul className="list">
                {TaskElement}
            </ul>
            <div className="btn">
                <button className={allBtnClass} onClick={onAllClickHandler}>All</button>
                <button className={activeBtnClass} onClick={onActiveClickHandler}>Active</button>
                <button className={completedBtnClass} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
