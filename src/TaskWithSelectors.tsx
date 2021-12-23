import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType} from "./AppWithRedux";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

type TaskWithSelectorsPropsType = {
    todoListId: string
    taskId: string
}

const TaskWithSelectors = React.memo(({todoListId, taskId}: TaskWithSelectorsPropsType) => {
    console.log('task rendered')
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoListId]
        .filter(task => task.id === taskId)[0])
    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => dispatch(removeTaskAC(taskId, todoListId)), [dispatch, taskId, todoListId])
    const changeStatus = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(taskId, todoListId, e.currentTarget.checked)),
        [dispatch, taskId, todoListId])
    const changTitle = useCallback(
        (title: string) => dispatch(changeTaskTitleAC(taskId, todoListId, title)),
        [dispatch, taskId, todoListId])

    return (
        <ListItem
            disableGutters
            className={task.isDone ? "is-done" : ""}
            key={task.id}
            divider
            style={{padding: "0px", display: "flex", justifyContent: "space-between"}}
        >
            <Checkbox
                onChange={changeStatus}
                color={"primary"}
                checked={task.isDone}
            />
            <EditableSpan title={task.title} setNewTitle={changTitle}/>
            <IconButton onClick={onRemoveHandler} size={"small"}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </ListItem>
    );
});

export default TaskWithSelectors;