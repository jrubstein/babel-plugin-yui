import template from 'babel-template';
import * as types from 'babel-types';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
let addTemplate = template(`
  var Y;
  YUI.add(MODULE_NAME_STRING, function(Y1) {
    Y = Y1;
  }, '1.0.0', {
    'requires': MODULE_REQUIRES
  });
`);

let useTemplate = template(`
  YUI().use(MODULE_REQUIRES, function(Y) {
    MODULE_BODY
  });
`);


export function add(name, requires) {
  return addTemplate({
    MODULE_NAME_STRING: types.stringLiteral(name),
    MODULE_REQUIRES: types.arrayExpression(requires)
  });
};

export function use(body, requires) {
  return useTemplate({
    MODULE_BODY: body,
    MODULE_REQUIRES: types.arrayExpression(requires)
  });
};
