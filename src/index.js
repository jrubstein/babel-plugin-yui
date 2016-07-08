import * as types from 'babel-types';
import {add, use} from './templates/engine';
import nPath from 'path';

export default function() {
  let requires = [];
  let inProgess = false;

  function clean() {
    inProgess = false;
    requires = [];
  };

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
          let addY = true;
          for (let path of path.get('body')) {
            // Finds all the imports
            if (path.isImportDeclaration()) {
              let module = path.node.source.value;
              if (path.node.specifiers.length == 0 || module.indexOf('/')  >= 0) {
                requires.push(types.stringLiteral(nPath.basename(module, '.js')));
              }
              //  modules.push(t.stringLiteral(path.node.specifiers[0].local.name));
              if (path.node.specifiers.length <= 0) {
                path.remove();
              }
            } else if (path.isExportDefaultDeclaration() || path.isExportDeclaration()) {
              if (path.node.declaration.type === 'FunctionDeclaration' &&
                path.node.declaration.id.name === 'render') {
                addY = false;
              }
            }
          }
          if (addY) {
            path.unshiftContainer("body", add(this.file.opts.basename, requires));
          }
        },
        exit(path) {
          clean();
        }
      }
    }
  };
}
