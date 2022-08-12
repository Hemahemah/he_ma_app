module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.hema.sale:8899/he_ma_api',
        changeOrigin: true,//控制请求头的host
        rewrite: path => path.replace(/^\/api/, '')

      },
    }
  }
}
