import React from 'react'
import TaskComponent from './TaskComponent'
import {useSelector} from 'react-redux'

const TaskListComponent = (props) => {
    const {tasks} = useSelector(state => state.taskSlice)
    const {mode} = props

    return (
        <React.Fragment>
            {
                tasks.map(task => {
                    switch (mode) {
                        case 'ALL':
                            return (
                                <TaskComponent
                                    key={task.id + Math.random()}
                                    task={task}
                                />
                            )
                        case 'PENDING':
                            return !task.isCompleted && (
                                <TaskComponent
                                    key={task.id + Math.random()}
                                    task={task}
                                />
                            )
                        case 'COMPLETED':
                            return task.isCompleted && (
                                <TaskComponent
                                    key={task.id + Math.random()}
                                    task={task}
                                />
                            )
                        default:
                            return (
                                <TaskComponent
                                    key={task.id + Math.random()}
                                    task={task}
                                />
                            )
                    }
                })
            }
        </React.Fragment>
    )
}

export default TaskListComponent