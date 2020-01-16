/**
 * @author: wangyongqi@baidu.com
 * @date: 2020-01-14 16:54:00
 * @last Modified time: 2020-01-14 16:54:00
 */


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 清空打包目录的插件


module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, 'src/')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:6].js'
    },
    optimization: {
        splitChunks: {
            chunks: "initial", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
            minSize: 300000, // 模块超过300k自动被抽离成公共模块
            minChunks: 1, // 模块被引用>=1次，便分割
            maxAsyncRequests: 5,  // 异步加载chunk的并发请求数量<=5
            maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
            name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
            // automaticNameDelimiter: '~', // 命名分隔符
            cacheGroups: { // 缓存组，会继承和覆盖splitChunks的配置
                default: { // 模块缓存规则，设置为false，默认缓存组将禁用
                    minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                    priority: -20, // 优先级
                    reuseExistingChunk: true, // 默认使用已有的模块
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
                    priority: -10,
                    name: 'vendors'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'stylus-loader'
                ]
            },
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
            chunks: ['index', 'vendors'],
            hash: true, // 防止缓存
            minify: {
                removeAttributeQuotes: true // 压缩 去掉引号
            }
        }),
        new CleanWebpackPlugin()
    ],
    devtool: 'source-map'
};

