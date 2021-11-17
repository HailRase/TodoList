import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTaskTitle, setNewTaskTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(newTaskTitle)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input value={newTaskTitle}
                     autoFocus={true}
                     onBlur={offEditMode}
                     onChange={onChangeTitleHandler}

            />
            : <span>{props.title}
                <button onClick={onEditMode}>edit</button> </span>
    )
}