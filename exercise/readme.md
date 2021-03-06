
### 实现自定义loader
TODO: introduce the definition of loader

loader的介绍和api官方文档中也会有详细介绍。这里记录在学习loader过程中的知识点。

#### 实现一个简单的loader
我们知道loader其实就是一个函数，因此定义loader跟平时定义函数无两样。在src目录下创建一个loaders目录，在下面的目录定义一个addCopyright.js。
```
├── dist
│   ├── index.html
│   ├── main.ac55aa.bundle.js
│   └── main.ac55aa.bundle.js.map
├── index.js
├── package.json
├── readme.md
├── src
│   ├── index.html
│   └── loaders
│       └── addCopyright.js
├── webpack.config.js
├── yarn-error.log
└── yarn.lock

```

webpack.config.js中配置如下:
```
module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            loader: path.resolve(__dirname, 'src/loaders', 'addCopyright')
        }
    ]
},
```

addCopyright.js中如下：
```
function addCopyright(content, map, meta) {
    return `/* @1999-2020 Apple. All rights reserved*/\n${content}`;
}
module.exports = addCopyright;
```

再运行yarn run build.就能够在bundle中看到添加的信息。
但是在config中直接在loader中写死路径，不是很方便。可以使用webpaak的resolveLoader配置项设置loaders的读取路径。
这样以后引用自定义laoder时都是从src/loaders目录中查找了。

```
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
            loader: 'addCopyright'
        }
    ]
},
```

#### loader的执行顺序

如果有多个loader时，执行loader顺序是从下到上，从右向左执行。但是可以给loader添加enforce属性来自定义。取值有'pre'|'post',分别表示
前置loader,后置loader。设置为pre时，即便loader写在最上面，也会先执行。还有一种是行内laoder，就是写在require()引用中的，这种执行顺序是在
normal后的。因此整个执行顺序就是pre > normal > inline > post。

例如require('-!inline-loader!./a.js');这里可以通过!的组合设置需要哪些loader处理。参见[https://webpack.js.org/concepts/loaders/#inline](https://webpack.js.org/concepts/loaders/#inline)

#### pitch loader

pitch-laoder的执行顺序正好跟mormal相反。[https://webpack.js.org/api/loaders/#pitching-loader](https://webpack.js.org/api/loaders/#pitching-loader)

如果在当前loader的pitch loader中返回了，那么当前loader及其后面的loader都不会再执行。

#### loader的特点
- 第一个loader必须返回一个string或者buffer，且是一个可执行的js脚本。
- 每个loader只能做一件事，从而使loader可以在更多的场景下链式调用
- 每一个loader都是一个模块
- 每个loader都是无状态的，确保loader在不同模块转换之间不保存状态。即每个loader都是一个纯函数。


#### 手写babel-loader

babel-loader内部实际是使用了@babel/core库进行代码的转换，同时在babel-loader中使用@babel/preset-env库以提供统一的js语法转换支持。

因为需要手动安装这两个库。

```
yarn add @babel/core @babel/preset-env -D
```

webpack配置
```
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
```

babel-loader
```

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
        console.log(result, 'result');
        cb(null, result.code, result.map);
    })
    .catch(err => {
        cb(err)
    });
}
```

#### 手写file-loader
以图片为例，目的就是根据图片生成一个md5文件名，然后发射到编译目录中，并导出dist的目录路径。

而url-loader,也同样会处理文件，但它有个options选项，可以根据limit的大小动态生成文件或者url.

```
const loaderUtils = require('loader-utils');
module.exports = function (content, map, meta) {

    const filename = loaderUtils.interpolateName(this, '[hash].[ext]', {content}); // 实际的命名规则可以从options中获取。
    this.emitFile(filename, content); // 在dist目录中生成一个文件
    return `module.exports="${filename}"`; // 注意此处需要使用双引号包裹作为一个字符串
};

module.exports.raw = true;
```


