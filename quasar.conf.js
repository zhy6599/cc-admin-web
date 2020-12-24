module.exports = function a(ctx) {
  return {
    supportTS: false,
    supportIE: false,
    boot: [
      'index',
      'filter',
      'msg',
      '/api',
    ],
    css: [
      'app.styl',
    ],
    extras: [
      'roboto-font',
      'material-icons',
      'mdi-v5',
    ],
    framework: {
      iconSet: 'material-icons',
      lang: 'zh-hans',
      importStrategy: 'auto',
      plugins: [
        'Notify',
        'Dialog',
        'AppFullscreen',
      ],
      config: {
        notify: {
          position: 'top',
          timeout: 4000,
          color: 'info',
          icon: 'info',
          actions: [{ icon: 'close', color: 'white' }],
        },
      },
    },
    animations: [],
    build: {
      vueRouterMode: 'history',
      transpile: true, // 执行babel转码
      vueCompiler: false, // 仅 Vue运行时
      scopeHoisting: true, // 提升运行时性能
      analyze: true, // 显示分析
      modern: true, // ES6
      extractCSS: false, // 从Vue文件中提取CSS
      minify: true, // 缩小代码
      preloadChunks: true, // 预加载
      sourceMap: ctx.dev,
      gzip: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        });
      },
      env: {
        PRODUCT_NAME: 'CC-ADMIN企业级快速开发平台',
        BASE_URL: '/cc-admin',
        SERVER_URL: 'http://127.0.0.1:8899',
      },
    },
    devServer: {
      https: false,
      port: 9666,
      open: true,
      proxy: {
        '/cc-admin': {
          target: 'http://127.0.0.1:8899',
          changeOrigin: true,
        },
      },
    },
  };
};
