import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    //console.log('AddItemForm was rendered')
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


    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={newTaskTitle}
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}
                label={"Title"}
                error={error}
                helperText={error && "Title is required!!!"}
            />
            <IconButton onClick={addItem} color={"primary"} size={"small"}>
                <AddBox fontSize={"large"}/>
            </IconButton>
        </div>
    )
})