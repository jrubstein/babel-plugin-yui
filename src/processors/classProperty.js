import * as types from 'babel-types';

export default function({node}) {
  if (!node.value) return {};
  return types.objectProperty(node.key, node.value);
}
