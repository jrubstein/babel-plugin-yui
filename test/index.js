'use strict';

var path = require('path'),
  fs = require('fs'),
  assert = require('assert'),
  core = require('babel-core'),
  babylon = require('babylon');

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

const base = path.join(__dirname, 'cases');

describe('Options', () => {

  fs.readdirSync(base).map((caseName) => {

    it(`Case ${caseName}`, () => {
      const actual = path.join(base, caseName, 'actual.js');
      const expected = fs.readFileSync(path.join(base, caseName, 'expected.js')).toString();
      const {code, ast} = core.transformFileSync(actual);
      assert.equal(trim(code), trim(expected));
    });

  });

});
