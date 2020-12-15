
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

如果有多个loader时，执行loader顺序是从下到上，从右向左执行。但是可以给loader添加enforce属性来自定义。取值有'pre'|'post',分别表示
前置loader,后置loader。设置为pre时，即便loader写在最上面，也会先执行。还有一种是行内laoder，就是写在require()引用中的，这种执行顺序是在
normal后的。因此整个执行顺序就是pre > normal > inline > post。






