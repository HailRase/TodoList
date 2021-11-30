import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {
    ActionType,
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./todo-lists-reducer";


test('correct todolist should be removed', ()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const startState: Array<TodoListType> =[
        {id: todoListId_1, title: "What to learn?", filter: "all"},
        {id: todoListId_2, title: "What to buy?", filter: "all"},
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId_1))

    expect(endState.length).toBe(1)

})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(action.id, action.title));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(action.id, action.filter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});





