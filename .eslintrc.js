module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: 'airbnb-base',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'class-methods-use-this': 'off',

    'no-underscore-dangle': ['error', {allow: ['_id']}], // mongodb _id field

    "no-unused-vars": [ 
      'error', 
      { 
        args: 'all', 
        argsIgnorePattern: '^__', 
        varsIgnorePattern: '^__', 
      } 
    ], 

    'max-len': ['error', {code: 120}],

    'object-curly-spacing': ['error', 'never'],

    'import/no-useless-path-segments': ['error', {noUselessIndex: true}],
  }
};
