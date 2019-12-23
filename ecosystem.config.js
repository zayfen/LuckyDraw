const path = require('path')

const ProjectPath = path.resolve(__dirname)
// const ScriptPath = path.join(ProjectPath, './node_modules/pm2/node_modules/.bin/ts-node')
const ScriptPath = './node_modules/.bin/ts-node'

const Config = {
  "apps" : [{
    "name": "luckydraw",
    "script": ScriptPath,
    "args": "src/server.ts",
    "cwd": "./",
    "instances" : "1",
    "exec_mode": "cluster",
    "watch": ["src"],
    "error_file": "./logs/luckydraw-error.log",
    "combine_logs": true,
    "log_date_format": "YYYY-MM-DD HH:mm Z",
    "out_file": "./logs/luckydraw-out.log",
    "env": {
      "NODE_ENV": "development",
      "PORT": 3030
    },
    "env_production": {
      "NODE_ENV": "production",
      "PORT": 3030
    }
  }]
}

module.exports = Config
