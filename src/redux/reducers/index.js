import { combineReducers } from 'redux'
import todos from './todos'
import todoFilter from './todo_filter'
const todoApp = combineReducers({ todos, todoFilter });
export default todoApp;
