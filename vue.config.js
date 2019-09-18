// vue.config.js
module.exports = {

  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  publicPath: '/',
  devServer: {
    proxy: {
      /* 多平台接口 */
      '': {
        target: 'https://v1.itooi.cn/',
        changeOrigin: true
      }
    }
  },

  // webpack配置
  configureWebpack: {}
}

// .env.development
