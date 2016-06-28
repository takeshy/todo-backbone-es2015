import Backbone from 'backbone';
import AppView from './app_view';

// The Filters Router class
// ------------------------

export default class Router extends Backbone.Router {
  get routes() {
    return {
      '*filter': 'filter'
    }
  }

  // #### Default Parameters
  // `param` in the `filter()` function is using ES6's support for default
  // parameter values. Many languages support the notion of a default
  // argument for functional parameters, but JavaScript hasn't until now.
  //
  // Default parameters avoid the need to specify your own defaults within the body of a
  // function. We've worked around this by performing logical OR (`||`) checks
  // against argument values to default if they're empty/null/undefined or of
  // the incorrect type. Native default parameter values provide a much cleaner
  // solution to this problem. Notably they are only triggered by `undefined`, and
  // not by any falsy value.
  //
  // Compare the old way...
  //
  //     function hello(firstName, lastName) {
  //         firstName = firstName || 'Joe';
  //         lastName = lastName || 'Schmo';
  //         return 'Hello, ' + firstName + ' ' + lastName;
  //     }
  //
  // ...to the new way...
  //
  //     function hello(firstName = 'Joe', lastName = 'Schmo') {
  //         return 'Hello, ' + firstName + ' ' + lastName;
  //     }
  initialize(options){
    this.todoFilter = options.todoFilter;
    this.todos = options.todos;
    new AppView({ todos: this.todos, todoFilter: this.todoFilter });
  }
  filter(param = '') {
    // *Set the current filter to be used.*
    this.todoFilter.set({ status: param });
  }
}
