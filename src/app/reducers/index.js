import {combineReducers} from 'redux'
import taskSlice from '../features/task/taskSlice'

export default combineReducers({
    taskSlice: taskSlice
})