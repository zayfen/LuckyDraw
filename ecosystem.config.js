const path = require('path')

const ProjectPath = path.resolve(__dirname)
const InterpreterPath = path.join(ProjectPath, './node_modules/pm2/node_modules/.bin/ts-node')
console.log("InterpreterPath: ", InterpreterPath)

const Config = {
  "apps" : [{
      "name": "luckydraw",
    "script": "./src/server.ts",
    "cwd": "./",
    "interpreter": InterpreterPath,
    "instances" : "2",
    "exec_mode": "cluster",
    "watch": ["src"],
    "error_file": "./logs/luckydraw-error.log",
    "combine_logs": true,
    "log_date_format": "YYYY-MM-DD HH:mm Z",
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

module.exports = Config
