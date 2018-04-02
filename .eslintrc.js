module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "airbnb-base",
  "parserOptions": {
    "sourceType": "module"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".mjs"]
      }
    }
  },
  "plugins": [],
  "rules": {
    "arrow-parens": [
      "error",
      "always"
    ],

    "import/extensions": [
      "error",
      "always",
      {
        "js": "never",
        "mjs": "never",
      }
    ],

    "indent": [
      "error",
      2
    ],

    "linebreak-style": [
      "error",
      "unix"
    ],

    "quotes": [
      "error",
      "single"
    ],

    "semi": [
      "error",
      "always"
    ],

    "curly": 2,

    "no-this-before-super": 2,

    "arrow-spacing": 2,

    "prefer-spread": 2,

    "object-curly-spacing": [
      2,
      "never"
    ],

    "no-throw-literal": 1,

    "no-use-before-define": 0,

    "arrow-body-style": 0,

    "no-console": 0,

    "no-global-assign": 0,
    "no-unsafe-negation": 0,

    "new-cap": [
      2,
      {
        "newIsCap": true,
        "capIsNew": false
      }
    ],

    "no-unused-vars": [
      2,
      {
        "args": "all",
        "argsIgnorePattern": "^__",
        "varsIgnorePattern": "^__"
      }
    ]
  }
};
