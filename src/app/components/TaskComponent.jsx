import React, {useState, useEffect} from 'react'
import './TaskComponent.css'
import {editTask, removeTask, toggleCompleteTask} from '../features/task/taskSlice'
import {useDispatch, useSelector} from 'react-redux'

const TaskComponent = (props) => {
    const dispatch = useDispatch()
    const {tasks} = useSelector(state => state.taskSlice)
    let {task} = props

    const [isChecked, setIsChecked] = useState(false)

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

    return (
        <div
            className="task"
            style={isChecked ? {backgroundColor: '#bdc3c7', border: 'none'} : {}}
        >
            <input
                type="text"
                className="task-text"
                style={isChecked ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                value={task.title}
                readOnly={true}
            />
            <div className="task-btn-view">
                <button
                    className="btn task-btn edit-btn"
                >
                    <i className="far fa-edit"></i>
                </button>

                <button
                    className="btn task-btn remove-btn"
                    onClick={onClickRemoveBtn}
                >
                    <i className="fas fa-times"></i>
                </button>

                <button
                    className="btn task-btn check-btn"
                    onClick={onClickCheckBtn}
                >
                    {isChecked && <i className="fas fa-check"></i>}
                </button>
            </div>
        </div>
    )
}

export default TaskComponent