
class FirstPlugin {
    apply(compiler) {

        console.log('first plugin');
        compiler.hooks.emit.tapAsync('FirstPlugin', (compilation, callback) => {
            console.log('编译中～～');
            console.log('compilation ', compilation);
            callback();
        });
    }
}

module.exports = FirstPlugin;