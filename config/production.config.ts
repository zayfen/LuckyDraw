import { Config } from './config.proto'

const ProductionConfig: Config = {
  mongodb: {
    // uri: 'mongodb://uo8kdu8o6qx5ygcchmeb:dSKIN4HGn0s0IPJEd7Ks@b4ry4ogxdqsmx10-mongodb.services.clever-cloud.com:27017/b4ry4ogxdqsmx10',
    uri: 'mongodb://s1.nsloop.com:24657/luckydraw',
    db: 'b4ry4ogxdqsmx10',
    user: 'uo8kdu8o6qx5ygcchmeb',
    password: 'dSKIN4HGn0s0IPJEd7Ks'
  },
  minio: {
    endpoint: 'minio.zayfen.com',
    useSSL: true,
    accessKey: 'xxx',
    secretKey: 'xxxxx'
  }
}

export default ProductionConfig
