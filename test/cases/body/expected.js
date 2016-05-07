'use strict';

YUI.add('actual', function (Y) {
  Y.namespace('WF2').Turtle = Y.Base.create('actual', Y.WF2.SOME.COOL.CLASS, [], {
    _private: 'I am private',
    alsoPrivate: ['Yes', 'No'],
    method: function method(param) {
      console.log('method');
    }
  }, {
    ATTRS: {}
  });
}, '1.0.0', {
  'requires': []
});
