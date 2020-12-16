
const babelCore = require('@babel/core');
// webpack5中loader中this方法内置了getOptions方法 https://webpack.js.org/api/loaders/#thisgetoptionsschema
// const loaderUtils = require('./babel-loader');
module.exports = function(content, map, mata) {

    // 解析options选项
    const options = this.getOptions();
    const cb = this.async();

    // https://babel.docschina.org/docs/en/babel-core/#transform
    babelCore.transformAsync(content, {
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop()
    }).then(result => {
        cb(null, result.code, result.map);
    })
    .catch(err => {
        cb(err)
    });
}