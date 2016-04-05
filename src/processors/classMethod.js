import * as types from 'babel-types';

export default function({node}, id) {
  return types.objectProperty(id || node.key,
    types.functionExpression(null,
      node.params,
      node.body,
      node.generated,
      node.async
    )
  );
}
