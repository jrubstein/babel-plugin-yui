import * as types from 'babel-types';
import MetaData from '../model/metaData';

export function hasDecoractor(path, name) {
  return (path.node.decorators || []).filter((decorator) => {
    return decorator.expression.name.toLowerCase() === name.toLowerCase();
  }).length > 0;
};

export function parse({node}) {
  let config = {};
  if (node.decorators) {
    node.decorators.filter((decorator) => {
      let type = decorator.expression.type;
      if (type === 'CallExpression' && decorator.expression.callee.name.toLowerCase() === 'mixins') {
        config.mixins = decorator.expression.arguments;
      } else if (type === 'CallExpression' && decorator.expression.callee.name.toLowerCase() === 'namespace') {
        config.namespace = decorator.expression.arguments;
      }
    });
  }

  return new MetaData(config);
};
