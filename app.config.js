
let path = require('path')

const INTERPRETER_PATH = path.resolve(__dirname, './node_modules/.bin/ts-node')

const CONFIG = {
  "apps" : [{
    "name": "luckydraw",
    // "interpreter": INTERPRETER_PATH,
    // "interpreter_args": "-P ./ -r tsconfig-paths/register",
    "script": "./src/server.ts",
    "cwd": ".",
    "instances" : "2",
    "exec_mode": "cluster",
    "watch": ["src"],
    "error_file": "./logs/luckydraw-error.log",
    "out_file": "./logs/luckydraw-out.log",
    "env": {
      "NODE_ENV": "development",
      "PORT": 3000
    },
    "env_production": {
      "NODE_ENV": "production",
      "PORT": 3000
    }
  }]
}

console.log('app.config.js: ', CONFIG)

module.exports = CONFIG
