import * as types from 'babel-types';
import propertyProccesor from './processors/classProperty';
import methodProccesor from './processors/classMethod';
import {hasDecoractor, parse} from './helpers/decorators';
import * as member from './helpers/memberExpressions';
import {add, use} from './templates/engine';
import nPath from 'path';

export default function() {
  let requires = [];
  let inProgess = false;

  return {
    // This plugin add easy access to the class properties
    inherits: require("babel-plugin-syntax-class-properties"),
    visitor: {
      FunctionDeclaration(path) {
        if (inProgess) {
          return;
        }
        inProgess = true;
        let {node} = path;
        // This is a controller.
        if (node.id.name === 'render') {
          path.parentPath.replaceWith(use(node.body.body, requires));
        }
        inProgess = false;
      },

      Program: {
        enter(path) {
          let addY = false;
          for (let path of path.get('body')) {
            // Finds all the imports
            if (path.isImportDeclaration()) {
              let module = path.node.source.value;
              requires.push(types.stringLiteral(nPath.basename(module, '.js')));
              //  modules.push(t.stringLiteral(path.node.specifiers[0].local.name));
              if (module.indexOf('/') === -1) {
                path.remove();
              }
            } else if (path.isClassDeclaration()) {
              addY = true;
            } else if (path.isExportDefaultDeclaration() || path.isExportDeclaration()) {
              if (path.node.declaration.type === 'ClassDeclaration') {
                addY = true;
              }
            }
          }
          if (addY) {
            path.unshiftContainer("body", add(this.file.opts.basename, requires));
          }
        },
        exit(path) {
          requires = [];
        }
      }
    }
  };
}
