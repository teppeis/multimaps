'use strict';

const importESLintConfig = require('tslint-import-eslint-config');
const prettierrc = require('eslint-config-teppeis/.prettierrc');
 
const config = importESLintConfig({
  extends: ['teppeis/node-v6', 'teppeis/+prettier', 'teppeis/+mocha'],
  rules: {}
});

config.extends.push('tslint-plugin-prettier');
Object.assign(config.rules, {
  prettier: [true, prettierrc],
});

config.linterOptions = {
  format: 'codeFrame',
};

module.exports = config;
