




module.exports = {
  devServer:{
    // // assetsSubDirectory: 'static',
    // // assetsPublicPath:'/',
    // proxyTable:{
    //   'apis':{
    //     target: 'http://127.0.0.1:8080/GepOnline2/gep',
    //     changeOrigin: true,
    //     pathRewrite:{
    //       '^/apis': ''
    //     }
    //   }
    // }
    // open: true,
    // host: '127.0.0.1',
    // port: 8081,
    // https: false,
    // //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '/api': {
        target: 'http://127.0.0.1:8080/gep/', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '' //请求的时候使用这个api就可以
        }
      }
    }
  },
    //...
    baseUrl: './'
  /*configureWebpack: {

    plugins: [

      new webpack.ProvidePlugin({

        $:"jquery",

        jQuery:"jquery",

        "windows.jQuery":"jquery"

      })

    ]

  }*/

    //...
}
