/**
 * @author: wangyongqi@baidu.com
 * @date: 2020-01-14 16:54:00
 * @last Modified time: 2020-01-14 16:54:00
 */


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve('src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties'
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
            chunks: ['index', 'vendor'],
            hash: true, // 防止缓存
            minify: {
                removeAttributeQuotes: true // 压缩 去掉引号
            }
        })
    ]
};

