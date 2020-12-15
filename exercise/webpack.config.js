/*
 * @Author: wangyongqi@baidu.com 
 * @Date: 2020-12-15 17:03:44 
 * @Last Modified by: wangyongqi@baidu.com
 * @Last Modified time: 2020-12-15 19:59:39
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 清空打包目录的插件

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:6].bundle.js'
    },
    resolveLoader: {
        modules: ['node_modules', 'src/loaders']
        // alias: {
        //     addCopyright: path.resolve(__dirname, 'src/loaders', 'addCopyright')
        // }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env' // 注意这里是presets选项，不是plugins选项
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            hash: true, // 防止缓存
            minify: {
                removeAttributeQuotes: true // 压缩 去掉引号
            }
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 8000,
        open: true
    },
    devtool: 'source-map'
}