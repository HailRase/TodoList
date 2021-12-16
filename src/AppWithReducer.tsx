import React, {useReducer, useState} from 'react';
import './App.css';
import {taskType, TodoList} from "./todoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./store/todo-lists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"


function AppWithReducer() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,[
        {id: todoListId_1, title: "What to learn?", filter: "all"},
        {id: todoListId_2, title: "What to buy?", filter: "all"},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "Css", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Graph QL", isDone: true}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true}
        ]

    })


    //функции для Task
    function addTask(title: string, todoListID: string) {
        /*let newTask: taskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})*/
        dispatchTasks(addTaskAC(title, todoListID))
    }

    function removeTask(taskID: string, todoListID: string) {
        /*setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})*/ // проверить работу через консоль после урока
        dispatchTasks(removeTaskAC(taskID, todoListID))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        /*setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: title} : t)
        })*/
        dispatchTasks(changeTaskTitleAC(taskID,todoListID,title))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {
        /*setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })*/
        dispatchTasks(changeTaskStatusAC(taskId,todoListID, isDone))
    }

    //функции для TodoList
    const addTodoList = (title: string) => {
        /*const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title: title,
            filter: "all"
        }

        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todoListID]: []})*/
        let action = AddTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const removeTodoList = (todoListID: string) => {
        /*setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]*/

        let action = RemoveTodoListAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        /*setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))*/

        dispatchTodoLists(ChangeTodoListTitleAC(todoListID, title))
    }
    function changeFilter(filter: FilterValuesType, todoListID: string) {
        /*setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))*/
        dispatchTodoLists(ChangeTodoListFilterAC(todoListID, filter))
    }

    //UI:
    const todoListsComponents = todoLists.map(tl => {

        let taskForRender: Array<TaskType> = tasks[tl.id];
        if (tl.filter === "active") {
            taskForRender = tasks[tl.id].filter(t => !t.isDone);
        }

        if (tl.filter === "completed") {
            taskForRender = tasks[tl.id].filter(t => t.isDone);
        }

        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "10px"}}>
                    <TodoList
                        id={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={taskForRender}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">
            <AppBar position={"sticky"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "29px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithReducer;


