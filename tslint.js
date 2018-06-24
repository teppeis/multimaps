'use strict';

const importESLintConfig = require('tslint-import-eslint-config');
const prettierrc = require('eslint-config-teppeis/.prettierrc');
 
module.exports = importESLintConfig({
  extends: ['teppeis/node-v6', 'teppeis/+prettier', 'teppeis/+mocha'],
  rules: {}
});

module.exports.extends.push('tslint-plugin-prettier');
Object.assign(module.exports.rules, {
  prettier: [true, prettierrc],
});
