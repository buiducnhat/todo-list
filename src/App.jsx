import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import TaskListComponent from './app/components/TaskListComponent'
import {addTask, removeAllTasks} from './app/features/task/taskSlice'
import {useDispatch} from 'react-redux'

const App = () => {
    const dispatch = useDispatch()

    const [taskInputText, setTaskInputText] = useState('')
    const [tasksListMode, setTasksListMode] = useState('ALL')

    const addBtnRef = useRef(null)
    const taskInputRef = useRef(null)

    useEffect(() => {
        taskInputRef.current.focus()
    }, [])

    // function to change style for control button
    const controlButtonStyle = (name) => {
        let isRightMode = (name === tasksListMode)
        return isRightMode ?
            {
                backgroundColor: '#ecf0f1',
                color: '#2c3e50'
            } : {
                backgroundColor: '#27ae60',
                color: '#ecf0f1'
            }
    }

    const onClickAddButton = () => {
        taskInputText && dispatch(addTask({title: taskInputText}))
    }

    return (
        <div className='container'>
            <div className='header'>
                <h1 className='header-text'>EASY TODO LIST</h1>
            </div>
            <div className='main'>
                <div className='top'>
                    <input
                        type='text'
                        className='input'
                        placeholder='new task'
                        value={taskInputText}
                        ref={taskInputRef}
                        onChange={(e) => {setTaskInputText(e.target.value)}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addBtnRef.current.focus()
                            }
                        }}
                    />
                    <button
                        className='btn add-btn'
                        onClick={onClickAddButton}
                        ref={addBtnRef}
                    >
                        ADD
                    </button>
                </div>
                <div className='control-view'>

                    <button
                        className='btn control-btn all-btn'
                        onClick={() => {setTasksListMode('ALL')}}
                        style={controlButtonStyle('ALL')}
                    >
                        ALL
                    </button>

                    <button
                        className='btn control-btn pending-btn'
                        onClick={() => {setTasksListMode('PENDING')}}
                        style={controlButtonStyle('PENDING')}
                    >
                        PENDING
                    </button>

                    <button
                        className='btn control-btn complete-btn'
                        onClick={() => {setTasksListMode('COMPLETED')}}
                        style={controlButtonStyle('COMPLETED')}
                    >
                        COMPLETED
                    </button>

                    <button
                        className='btn control-btn clear-btn'
                        onClick={() => {dispatch(removeAllTasks())}}
                    >
                        CLEAR
                    </button>
                </div>
                <div className='middle'>
                    <TaskListComponent mode={tasksListMode} />
                </div>
            </div>
        </div>
    )
}

export default App
