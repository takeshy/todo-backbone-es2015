import _ from 'lodash';
export default function mapStateToBackbone(options) {
  const todos = options.todos;
  const todoFilter = options.todoFilter;
  const state = options.store.getState()

  localStorage.setItem("todoApp", JSON.stringify(state));

  const currentIDs = todos.map((todo)=> todo.id);
  const stateIDs = state.todos.map((todo)=> todo.id);
  _.difference(currentIDs, stateIDs).forEach((id) => todos.get(id).destroy());

  todos.set(state.todos);
  todoFilter.set({ status: state.todoFilter })
  return;
}
