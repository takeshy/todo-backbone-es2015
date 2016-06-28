import Backbone from 'backbone';
import Router from './backbone/router';
import TodoFilter from './backbone/todo_filter';
import TodoList from './backbone/todo_list';
import $ from 'jquery';
const todoFilter = new TodoFilter();
const todos = new TodoList();

$(() => {
  // *Finally, we kick things off by creating the **App**.*
  new Router({ todos: todos, todoFilter: todoFilter });
  Backbone.history.start();
});
