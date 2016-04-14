'use strict';

YUI.add('Turtle', function (Y) {
  Y.namespace('WF2').Turtle = Y.Base.create('Turtle', Y.WF2.SOME.COOL.CLASS, [], {
    _private: 'I am private',
    alsoPrivate: ['Yes', 'No'],
    method: function (param) {
      console.log('method');
    }
  }, {
    ATTRS: {}
  });
}, '1.0.0', {
  'requires': [],
  'lang': [],
  'skinnable': false
});
