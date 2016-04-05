import * as types from 'babel-types';

export function toString(member, property) {
  if (!member.object) {
    return property? member.name + '.' + property.name : member.name;
  }
  let name = this.toString(member.object) + '.' + member.property.name;
  if (property) {
    name += '.' + property.name;
  }
  return name;
};
