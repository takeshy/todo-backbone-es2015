import Backbone from 'backbone';
import {ENTER_KEY} from '../constants/key';
import * as actions from '../redux/actions';
// Todo Item View class
// --------------------

// *The DOM element for a todo item...*
export default class TodoView extends Backbone.View {
  get template(){
    return require("ejs!../templates/item.html.ejs");
  }
  get tagName(){
    return 'li';
  }
  get events(){
    return  {
      'click .toggle': 'toggleCompleted',
      'dblclick label': 'edit',
      'click .destroy': 'clear',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    }
  }
  initialize(options){
    this.store = options.store;
    this.todoFilter = options.todoFilter;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.todoFilter,'change', this.toggleVisible);
    this.render();
  }

  // *Re-render the contents of the todo item.*
  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass('completed', this.model.get('completed'));
    this.toggleVisible();
    this.input = this.$('.edit');
    return this;
  }

  toggleVisible() {
    this.$el.toggleClass('hidden', this.isHidden);
  }

  // #### Property Getters and Setters
  // `isHidden()` is using something we call a property getter.
  // Although technically part of ECMAScript 5.1, getters and
  // setters allow us to write and read properties that lazily compute
  // their values. Properties can process values assigned in a
  // post-process step, validating and transforming during assignment.
  //
  // In general, this means using `set` and `get` to bind a property
  // of an object to a function which is invoked when the property is
  // being set and looked up. [Read more](http://ariya.ofilabs.com/2013/03/es6-and-method-definitions.html)
  // on getters and setters.
  get isHidden() {
    var isCompleted = this.model.get('completed'); // const
    return (// hidden cases only
      (!isCompleted && this.todoFilter.isCompleted()) ||
      (isCompleted && this.todoFilter.isActive())
    );
  }

  // *Toggle the `'completed'` state of the model.*
  toggleCompleted() {
    this.store.dispatch(actions.toggleTodo(this.model.id));
  }

  // *Switch this view into `'editing'` mode, displaying the input field.*
  edit() {
    var value = this.input.val(); // const

    this.$el.addClass('editing');
    this.input.val(value).focus();
  }

  // *Close the `'editing'` mode, saving changes to the todo.*
  close() {
    var title = this.input.val(); // const

    if (title) {
      this.store.dispatch(actions.changeTitle(this.model.id, title));
    } else {
      this.clear();
    }
    this.$el.removeClass('editing');
  }

  // *If you hit `enter`, we're through editing the item.*
  updateOnEnter(e) {
    if (e.which === ENTER_KEY) {
      this.close();
    }
  }

  // *Remove the item and destroy the model.*
  clear() {
    this.store.dispatch(actions.destroyTodo(this.model.id));
  }
}
