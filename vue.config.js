var webpack = require('webpack')

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8800',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        config.plugin('ignore')
            .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));  //忽略/moment/locale下的所有文件
    }
}