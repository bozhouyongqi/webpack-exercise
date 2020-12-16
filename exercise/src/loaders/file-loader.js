
const loaderUtils = require('loader-utils');
module.exports = function (content, map, meta) {

    const filename = loaderUtils.interpolateName(this, '[hash].[ext]', {content}); // 实际的命名规则可以从options中获取。
    this.emitFile(filename, content); // 在dist目录中生成一个文件
    return `module.exports="${filename}"`; // 注意此处需要使用双引号包裹作为一个字符串
};

module.exports.raw = true;
