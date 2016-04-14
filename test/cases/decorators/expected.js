'use strict';

YUI.add('Turtle', function (Y) {
  Y.namespace('WF2').Turtle = Y.Base.create('Turtle', Y.Base, [Y.WF2.Table], {}, {
    ATTRS: {}
  });
}, '1.0.0', {
  'requires': [],
  'lang': ['en', 'es', 'fr'],
  'skinnable': true
});
