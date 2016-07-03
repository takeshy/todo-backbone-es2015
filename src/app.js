import { createStore } from 'redux'
import todoApp from './redux/reducers'
import Backbone from 'backbone';
import Router from './backbone/router';
import TodoFilter from './backbone/todo_filter';
import TodoList from './backbone/todo_list';
import $ from 'jquery';
const todoFilter = new TodoFilter();
const todos = new TodoList();
const store = createStore(todoApp, {} ,window.devToolsExtension && window.devToolsExtension());
Backbone.sync = ()=>{}
import mapStateToBackbone from './map_state_to_backbone';

store.subscribe(() =>
  mapStateToBackbone({ store: store, todos: todos, todoFilter: todoFilter })
)

$(() => {
  // *Finally, we kick things off by creating the **App**.*
  new Router({ store: store, todos: todos, todoFilter: todoFilter });
  Backbone.history.start();
});
