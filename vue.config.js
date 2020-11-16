
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  filenameHashing: false,
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0', // 默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    port: 8080, // 端口号
    // https: true, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: {
      '/': {
        target: 'https://001.ruer.coboriel.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@views', resolve('./src/views'))
      .set('@router', resolve('./src/router'))
  }
}
