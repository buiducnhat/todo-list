import {createSlice} from '@reduxjs/toolkit'

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        id: 0,
        tasks: []
    },
    reducers: {
        addTask(state, action) {
            let {title} = action.payload
            state.id += 1
            state.tasks.push({id: state.id, title: title, isCompleted: false})
        },
        toggleCompleteTask(state, action) {
            let {id} = action.payload
            state.tasks = state.tasks.map(task => {
                if (task.id === id) {
                    task.isCompleted = !task.isCompleted
                }
                return task
            })
        },
        editTask(state, action) {
            let {id, title} = action.payload
            state.tasks = state.tasks.map(task => {
                if (task.id === id) {
                    task.title = title
                }
                return task
            })
        },
        removeTask(state, action) {
            let {id} = action.payload
            state.tasks = state.tasks.filter(task => task.id !== id)
        },
        removeAllTasks(state, action) {
            state.tasks = []
        }
    }
})

export const {
    addTask,
    toggleCompleteTask,
    editTask,
    removeTask,
    removeAllTasks
} = taskSlice.actions

export default taskSlice.reducer