'use strict';

YUI.add('Turtle', function (Y) {
  Y.namespace('WF2').Turtle = Y.Base.create('Turtle', Y.WF2.SOME.COOL.CLASS, [], {
    initializer: function () {
      var variable = 'This is a constructor';
    }
  }, {
    ATTRS: {}
  });
}, MODULE_VERSION, {
  'requires': [],
  'lang': [],
  'skinnable': false
});
