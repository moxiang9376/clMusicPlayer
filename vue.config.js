// vue.config.js
module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  publicPath: "/",
  devServer: {
    proxy: {
      /* 多平台接口 */
      "https://v1.itooi.cn/": {
        target: "https://v1.itooi.cn/",
        changeOrigin: true,
      },
      "https://c.y.qq.com/": {
        target: "https://c.y.qq.com",
        changeOrigin: true,
      },
      "http://118.24.179.175:8888/": {
        target: "http://118.24.179.175:8888/",
        changeOrigin: true,
      },
    },
  },

  // webpack配置
  configureWebpack: {},
};

// .env.development
