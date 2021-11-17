import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props:AddItemFormPropsType) => {
    const errorMsgStyles = { backgroundColor: "red", color: "white", fontWeight: 900}
    const  errorInputStyles = {border: "2px solid red", outline: "none"}
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setNewTaskTitle("")
        } else {
            setError(true)
        }
        setNewTaskTitle("")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const errorMessage = error && <div style={errorMsgStyles}>Title is required!</div>


    return (
        <div>
            <input
                style={error ? errorInputStyles : undefined}
                value={newTaskTitle}
                placeholder='Enter title...'
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}