import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'lodash';
import TodoView from './todo_view';
import {ENTER_KEY} from '../constants/key';
import * as actions from '../redux/actions';
// The Application class
// ---------------------

// *Our overall **AppView** is the top-level piece of UI.*
export default class AppView extends Backbone.View {
  get template(){
    return require("ejs!../templates/stats.html.ejs");
  }
  get events(){
    return {
      'keypress #new-todo': 'createOnEnter',
      'click #clear-completed': 'clearCompleted',
      'click #toggle-all': 'toggleAllComplete'
    };
  }
  initialize(options){
    // *Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.*
    this.setElement($('#todoapp'), true);

    this.todos = options.todos;
    this.todoFilter = options.todoFilter;
    this.store = options.store;
    // *At initialization, we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in localStorage.*
    this.allCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(this.todos, 'add', this.addOne);
    this.listenTo(this.todos, 'all', this.render);
    this.listenTo(this.todoFilter, 'all', this.render);

    this.store.dispatch(actions.fetchAll());
  }

  // *Re-rendering the App just means refreshing the statistics— the rest of
  // the app doesn't change.*
  render() {
    var completed = this.todos.completed().length; // const
    var remaining = this.todos.remaining().length; // const

    if (this.todos.length) {
      this.$main.show();
      this.$footer.show();

      this.$footer.html(
        this.template({
          completed, remaining
        })
      );

      this.$('#filters li a')
        .removeClass('selected')
        .filter('[href="#/' + this.todoFilter.get("status") + '"]')
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }

    this.allCheckbox.checked = !remaining;
  }

  // *Add a single todo item to the list by creating a view for it, then
  // appending its element to the `<ul>`.*
  addOne(model) {
    var view = new TodoView({ model:model, store: this.store, todoFilter: this.todoFilter }); // const
    $('#todo-list').append(view.render().el);
  }

  // *Add all items in the **Todos** collection at once.*
  addAll() {
    this.$('#todo-list').html('');
    this.todos.each(this.addOne, this);
  }

  // *Generate the attributes for a new Todo item.*
  newAttributes() {
    return {
      title: this.$input.val().trim(),
      order: this.todos.nextOrder(),
      completed: false
    };
  }

  // *If you hit `enter` in the main input field, create a new **Todo** model,
  // persisting it to localStorage.*
  createOnEnter(e) {
    if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
      return;
    }
    this.store.dispatch(actions.createTodo(this.newAttributes()));
    this.$input.val('');
  }

  // *Clear all completed todo items and destroy their models.*
  clearCompleted() {
    this.store.dispatch(actions.clearCompleted());
    return false;
  }

  toggleAllComplete() {
    this.store.dispatch(actions.toggleAllComplete(this.allCheckbox.checked));
  }
}
