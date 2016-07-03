import * as ActionType from '../constants/action_type';

export function fetchAll() {
  const str = localStorage.getItem('todoApp');
  let data = {}
  if (str) {
    data = JSON.parse(str)
  }
  return { type: ActionType.FETCH_ALL, data: data };
}

export function changeFilter(filter) {
  return { type: ActionType.CHANGE_FILTER, filter: filter }
}

export function toggleAllComplete(completed) {
  return { type: ActionType.TOGGLE_ALL_COMPLETE, completed: completed };
}

export function clearCompleted() {
  return { type: ActionType.CLEAR_COMPLETED };
}

export function createTodo(todo) {
  return { type: ActionType.CREATE_TODO, todo: todo };
}

export function toggleTodo(id) {
  return { type: ActionType.TOGGLE_TODO, id: id };
}

export function changeTitle(id, title) {
  return { type: ActionType.CHANGE_TITLE, id: id, title: title };
}

export function destroyTodo(id) {
  return { type: ActionType.DESTROY_TODO, id: id };
}
