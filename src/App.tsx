import React, {useState} from 'react';
import './App.css';
import {taskType, TodoList} from "./todoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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


function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn?", filter: "all"},
        {id: todoListId_2, title: "What to buy?", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
        let newTask: taskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function removeTask(taskID: string, todoListID: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})                                // проверить работу через консоль после урока
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: title} : t)
        })
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {

        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }

    //функции для TodoList
    const addTodoList = (title: string) => {
        const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todoListID]: []})
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }
    function changeFilter(filter: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
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


export default App;


