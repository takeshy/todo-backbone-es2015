import Backbone from 'backbone';

export default class TodoFilter extends Backbone.Model {
  // Note the omission of the 'function' keyword— it is entirely optional in
  // ES6.

  // *Define some default attributes for the todo.*
  defaults() {
    return {
      status: '',
    };
  }

  isCompleted() {
    return this.get('status') === 'completed';
  }

  isActive() {
    return this.get('status') === 'active';
  }
}
