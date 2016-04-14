import * as types from 'babel-types';
import propertyProccesor from './processors/classProperty';
import methodProccesor from './processors/classMethod';
import {hasDecoractor, parse} from './helpers/decorators';
import * as member from './helpers/memberExpressions';
import {add, use} from './templates/engine'

export default function() {
  let requires = [];
  let inProgess = false;

  return {
    // This plugin add easy access to the class properties
    inherits: require("babel-plugin-syntax-class-properties"),
    visitor: {
      ExportNamedDeclaration(path) {
        if (inProgess) {
          return;
        }
        inProgess = true;
        // We dont want any export declaration.
        path.remove();
        inProgess = false;
      },

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

      Class(path) {
        let innerBody = [];
        let staticBody = [];
        let attributes = [];
        let body = path.get('body');
        let ref;
        let metaData;
        let superClassName = 'Y.Base';

        if (inProgess) {
          return;
        }

        inProgess = true;
        if (path.get('superClass') && path.get('superClass').node) {
          if (types.isMemberExpression(path.get('superClass').node)) {
            let memberExpression = path.get('superClass').node;
            superClassName = member.toString(memberExpression.object, memberExpression.property);
          } else {
            superClassName = path.get('superClass').node.name;
          }
        }

        // Get the class reference.
        if (path.isClassExpression() || !path.node.id) {
          ref = path.scope.generateUidIdentifier('class');
        } else {
          ref = path.node.id;
        }

        metaData = parse(path);

        for (let node of body.get('body')) {
          let result;

          if (hasDecoractor(node, 'attribute')) {
            attributes.push(propertyProccesor(node));
            node.remove();
          } else if (node.isClassProperty()) {
            result  = propertyProccesor(node);
          } else if (node.isClassMethod({ kind: 'constructor' })) {
            result = methodProccesor(node, types.identifier('initializer'));
            innerBody.push(result);
            node.remove();
          } else if (node.isClassMethod()) {
            result = methodProccesor(node);
          }

          if (node.node) {
            if (node.node.static) {
              staticBody.push(result);
            } else {
              innerBody.push(result);
            }
          }
        }

        staticBody.push(
          types.objectProperty(types.identifier('ATTRS'), types.objectExpression(attributes))
        );

        path.replaceWith(add(ref.name, superClassName,
          types.objectExpression(innerBody), types.objectExpression(staticBody),
          metaData, requires));

        inProgess = false;
      },
      Program: {
        enter(path) {
          for (let path of path.get('body')) {
            // Finds all the imports
            if (path.isImportDeclaration()) {
              requires.push(types.stringLiteral(path.node.source.value));
              //  modules.push(t.stringLiteral(path.node.specifiers[0].local.name));
              path.remove();
            }
          }
        },
        exit(path) {
          requires = [];
        }
      }
    }
  };
}
