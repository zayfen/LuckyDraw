import { Config } from "./config.proto"
import DevConfig from './dev.config'
import ProductionConfig from './dev.config'


let env: string = process.env.NODE_ENV
let config: Config = null

if (env === 'production') {
  config = ProductionConfig
} else {
  config = DevConfig
}

export default config
