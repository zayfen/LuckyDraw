import { Config } from './config.proto'

const DevConfig: Config = {
  mongodb: {
    uri: 'mongodb://uo8kdu8o6qx5ygcchmeb:dSKIN4HGn0s0IPJEd7Ks@b4ry4ogxdqsmx10-mongodb.services.clever-cloud.com:27017/b4ry4ogxdqsmx10',
    db: 'b4ry4ogxdqsmx10',
    user: 'uo8kdu8o6qx5ygcchmeb',
    password: 'dSKIN4HGn0s0IPJEd7Ks'
  },
  // mongodb: {
  //   uri: 'mongodb://s1.nsloop.com:24657/luckydraw',
  //   db: 'luckydraw',
  //   user: '',
  //   password: ''
  // }  
}
// mongodb://s1.nsloop.com:24657/luckydraw
export default DevConfig
