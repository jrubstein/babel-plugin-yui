'use strict';

YUI.add('actual', function (Y) {
  Y.namespace('WF2').Turtle = Y.Base.create('actual', Y.WF2.SOME.COOL.CLASS, [], {
    initializer: function initializer() {
      var variable = 'This is a constructor';
    }
  }, {
    ATTRS: {}
  });
}, '1.0.0', {
  'requires': []
});
