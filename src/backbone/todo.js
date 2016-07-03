import Backbone from 'backbone';

// Todo Model class
// ----------------

// #### Classes
// In JavaScript, we've relied on prototypal inheritance anytime we've needed
// a class-like system. This has led to overly verbose code using custom types.
// ES6 changes that by removing the ugly multi-step inheritance patterns we're
// used to and introducing a minimal class syntax that makes defining classes a
// lot more terse.

// ES6 classes desugar to prototypal inheritance behind the scenes and the only
// real change is that there's less typing required for us. Classes are compact
// and we can use an 'extend' keyword to implement a new sub-class from a
// base-class. Below, we do this to define a `Todo` class which `extends` Backbone's
// Model component.
export default class Todo extends Backbone.Model {

  // Note the omission of the 'function' keyword— it is entirely optional in
  // ES6.

  // *Define some default attributes for the todo.*
  defaults() {
    return {
      title: '',
      completed: false
    };
  }
}
