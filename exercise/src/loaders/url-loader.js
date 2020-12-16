
const mime = require('mime');
module.exports = function(content, map, meta) {
    const mimeType = mime.getType(this.resourcePath);
    const options = this.getOptions();
    if (content.length > options.limit) {
        // 采用file-loader
        return require('./file-loader').call(this, content, map, meta);
    } 
    return `module.exports="data:${mimeType};base64,${content.toString('base64')}"`
}

module.exports.raw = true;
