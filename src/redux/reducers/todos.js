import * as ActionType from '../constants/action_type';

function todos(state = [], action) {
  switch(action.type) {

    case ActionType.FETCH_ALL:
      if(action.data['todos']) {
        return action.data['todos'];
      } else {
        return state;
      }

    case ActionType.TOGGLE_ALL_COMPLETE:
      return state.map((todo)=> Object.assign({}, todo, { completed: action.completed }));

    case ActionType.CLEAR_COMPLETED:
      return state.filter((todo) => !todo.completed )

    case ActionType.CREATE_TODO:
      let id = 1;
      if (state.length != 0) {
        id = state.sort((a, b) => a.id > b.id)[state.length - 1].id + 1
      }
      return [...state, { id: id, order: id, title: action.todo.title, completed: false }];

    case ActionType.TOGGLE_TODO:
      return state.map((todo)=> {
        if (todo.id == action.id) {
          return Object.assign({}, todo, { completed: !todo.completed });
        } else {
          return todo
        }
      });

    case ActionType.CHANGE_TITLE:
      return state.map((todo) => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, { title: action.title })
        } else {
          return todo
        }
      });

    case ActionType.DESTROY_TODO:
      return state.filter((todo) => todo.id != action.id )

    default:
      return state;
  }
}
export default todos;
