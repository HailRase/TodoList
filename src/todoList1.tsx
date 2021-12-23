import React, {ChangeEvent, useCallback} from "react";
import {TodoListType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./store/todo-lists-reducer";
import TaskWithSelectors from "./TaskWithSelectors";


export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
}
export type FilterValuesType = "all" | "active" | "completed"

export const TodoList1 = React.memo((props: PropsType) => {
    console.log('TodoList')

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
        return (
           <TaskWithSelectors key={t.id} todoListId={props.todoListId} taskId={t.id}/>
        )
    })

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todoListId))
    }
    const onAllClickHandler = () => dispatch(ChangeTodoListFilterAC(props.todoListId, 'all'))
    const onActiveClickHandler = () => dispatch(ChangeTodoListFilterAC(props.todoListId, 'active'))
    const onCompletedClickHandler = () => dispatch(ChangeTodoListFilterAC(props.todoListId, 'completed'))
    const onChangeTodoListTitle = useCallback((title: string) => {
        console.log('Title was changed')
        dispatch(ChangeTodoListTitleAC(props.todoListId, title))
    },[dispatch])




    /*const allBtnClass = filter === "all" ? "active-filter" : ""
    const activeBtnClass = filter === "active" ? "active-filter" : ""
    const completedBtnClass = filter === "completed" ? "active-filter" : ""*/

    return (
        <div className="todolist">
            <Typography variant={"h6"} style={{fontWeight: "bold"}}>
                <EditableSpan title={todoLists.title} setNewTitle={onChangeTodoListTitle}/>
                <IconButton onClick={useCallback(() => dispatch(RemoveTodoListAC(props.todoListId)), [dispatch, props.todoListId])}>
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
})
