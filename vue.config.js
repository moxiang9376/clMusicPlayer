// vue.config.js
module.exports = {

  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  publicPath: '/',
  devServer: {
    proxy: {
      'http://118.24.179.175:8888/': {
        target: 'http://118.24.179.175:8888/',
        changeOrigin: true
      },
      /* 多平台接口 */
      'https://v1.itooi.cn/': {
        target: 'https://v1.itooi.cn/',
        changeOrigin: true
      },
      '/test': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/test': '' // 路径重写
        }
      }
    }
  },

  // webpack配置
  configureWebpack: {}
}

// .env.development
