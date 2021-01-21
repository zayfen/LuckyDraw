const path = require('path')

function resolvePath (dir) {
  return path.join(__dirname, dir)
}

module.exports = { 
  runtimeCompiler: true,
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolvePath('src'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true
      }
    }
  }
}
