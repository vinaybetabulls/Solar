module.export = {
    "parser": "babel-eslint",
    "rules": {
      "strict": 0
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "codeFrame": true,
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        }
      }
  }