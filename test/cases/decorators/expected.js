'use strict';

YUI.add('Turtle', function (Y) {
  Y.namespace('WF2').Turtle = Y.Base.create('Turtle', Y.Base, [Y.WF2.Table], {}, {
    ATTRS: {}
  });
}, MODULE_VERSION, {
  'requires': [],
  'lang': ['en', 'es', 'fr'],
  'skinnable': true
});
