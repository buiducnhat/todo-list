import React, {useState, useEffect, useRef} from 'react'
import './TaskComponent.css'
import {editTask, removeTask, toggleCompleteTask} from '../features/task/taskSlice'
import {useDispatch, useSelector} from 'react-redux'

const TaskComponent = (props) => {
    const dispatch = useDispatch()
    const {tasks} = useSelector(state => state.taskSlice)
    let {task} = props

    const [isChecked, setIsChecked] = useState(false)
    const [isEditting, setIsEditting] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState(task.title)

    const editInputRef = useRef(null)
    const editBtnRef = useRef(null)

    useEffect(() => {
        task = tasks.find(ele => ele.id === task.id)
        setIsChecked(task.isCompleted)
    }, [isChecked])

    const onClickCheckBtn = () => {
        dispatch(toggleCompleteTask({id: task.id}))
        setIsChecked(!isChecked)
    }

    const onClickRemoveBtn = () => {
        dispatch(removeTask({id: task.id}))
    }

    const onClickEditBtn = () => {
        if (!isEditting) {
            editInputRef.current.focus()
            return setIsEditting(true)
        } else {
            dispatch(editTask({id: task.id, title: newTaskTitle}))
            setIsEditting(false)
        }
    }

    return (
        <div
            className='task'
            style={isChecked ? {backgroundColor: '#bdc3c7', border: 'none'} : {}}
        >
            <input
                type='text'
                className='task-text'
                style={isChecked ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                value={newTaskTitle}
                readOnly={!isEditting}
                ref={editInputRef}
                onChange={(e) => {setNewTaskTitle(e.target.value)}}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        editBtnRef.current.focus()
                    }
                }}
            />
            <div className='task-btn-view'>
                <button
                    className='btn task-btn edit-btn'
                    ref={editBtnRef}
                    onClick={onClickEditBtn}
                >
                    {
                        isEditting ? <i className='far fa-save'></i> : <i className='far fa-edit'></i>
                    }
                </button>

                <button
                    className='btn task-btn remove-btn'
                    onClick={onClickRemoveBtn}
                >
                    <i className='fas fa-times'></i>
                </button>

                <button
                    className='btn task-btn check-btn'
                    onClick={onClickCheckBtn}
                >
                    {isChecked && <i className='fas fa-check'></i>}
                </button>
            </div>
        </div>
    )
}

export default TaskComponent