import React, {ChangeEvent, memo} from 'react';
import {TaskType} from "./TodoList";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

type TaskPropsType = {
    task:TaskType
    todolistId: string

}

export const TaskWithRedux:React.FC<TaskPropsType> = memo(({task, todolistId}) => {
    console.log('Task')
    const {id, title, isDone} = task
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistId));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId));
    }



    return <div className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
});

