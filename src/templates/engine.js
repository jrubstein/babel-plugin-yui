import template from 'babel-template';
import * as types from 'babel-types';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
let addTemplate = template(`
  YUI.add(MODULE_NAME_STRING, function(Y) {
    Y.namespace(MODULE_NS).MODULE_NAME = Y.Base.create(MODULE_NAME_STRING, MODULE_BASE, MODULE_MIXINS,
      MODULE_BODY,
      STATIC_BODY
    );
  }, MODULE_VERSION, {
    'requires': MODULE_REQUIRES,
    'lang': MODULE_LANG,
    'skinnable': HAS_SKIN
  });
`);

export function add(id, superClassName, body, staticBody, metaData, requires) {
  return addTemplate({
    MODULE_NAME: types.identifier(id),
    MODULE_NAME_STRING: types.stringLiteral(id),
    MODULE_BASE: types.identifier(superClassName),
    MODULE_BODY: body,
    MODULE_REQUIRES: types.arrayExpression(requires),
    MODULE_LANG: metaData.lang,
    HAS_SKIN: types.booleanLiteral(metaData.style),
    MODULE_MIXINS: metaData.mixins,
    MODULE_NS: metaData.namespace,
    STATIC_BODY: staticBody
  });
};
