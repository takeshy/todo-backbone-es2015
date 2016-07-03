import * as ActionType from '../constants/action_type';

function todoFilter(state = '', action) {
  switch(action.type) {
    case ActionType.FETCH_ALL:
      return action.data['todoFilter'] || state;

    case ActionType.CHANGE_FILTER:
      return action.filter;

    default:
      return state;
  }
}
export default todoFilter;
