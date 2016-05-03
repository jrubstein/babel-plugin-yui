import * as types from 'babel-types';

export default class MetaData {
  constructor(data) {
    this._lang = data.lang || types.arrayExpression([]);
    this._namespace = data.namespace || types.stringLiteral('WF2');
    this._mixins = data.mixins || types.arrayExpression([]);
  };

  get lang() {
    return this._lang;
  }

  set lang(lang) {
    this._lang = data.lang || [];
  }

  get mixins() {
    return this._mixins;
  }

  set mixins(mixins) {
    this._mixins = mixins || [];
  }

  get namespace() {
    return this._namespace;
  }

  set namespace(namespace) {
    this._namespace = namespace || types.stringLiteral('WF2');
  }
}
