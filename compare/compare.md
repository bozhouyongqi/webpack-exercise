[TOC]

### webpack4升级初体验

#### webpack4改动点 [https://v4.webpack.js.org/migrate/4/](http://https://v4.webpack.js.org/migrate/4/)

```
1. 不再支持node v4,需要更新到node v6版本或者更高
2. webpack cli工具单独抽离了出来，需要单独安装才能使用
3. 需要更新或替换部分插件以适配webpack4,例如extractTextPlugin插件，可以用mini-css-extract-plugin插件代替
4. webpack4提供了mode配置选项，以实现开发环境或者生产环境的一键配置或者零配置，其中生产环境中默认启动了一些插件优化，例如代码压缩，tree-shaking等
5.增加了更多内置的优化选项。如不在需要使用CommonsChunkPlugin，使用optimization.splitChunks配置选项即可
```

#### webpack3/webpack4开发环境与生产环境的对比

分别使用webpckk3和webpack4构建相同的项目，项目中使用react,react-dom,react-router-dom作为基础库，引入lodash,echarts库增加构建耗时,以防止文件过小导致差异不明显。
#### 开发环境编译对比
webpack3
```
test1
Hash: 15803c5d52b5f93f6aff
Version: webpack 3.12.0
Time: 5345ms
              Asset       Size  Chunks                    Chunk Names
    index.15803c.js     5.1 MB       0  [emitted]  [big]  index
index.15803c.js.map    6.23 MB       0  [emitted]         index
         index.html  359 bytes          [emitted]

test2
Hash: 15803c5d52b5f93f6aff
Version: webpack 3.12.0
Time: 5612ms
              Asset       Size  Chunks                    Chunk Names
    index.15803c.js     5.1 MB       0  [emitted]  [big]  index
index.15803c.js.map    6.23 MB       0  [emitted]         index
         index.html  359 bytes          [emitted]
 
test3
Hash: 15803c5d52b5f93f6aff
Version: webpack 3.12.0
Time: 5282ms
              Asset       Size  Chunks                    Chunk Names
    index.15803c.js     5.1 MB       0  [emitted]  [big]  index
index.15803c.js.map    6.23 MB       0  [emitted]         index
         index.html  359 bytes          [emitted]

test4
Hash: 15803c5d52b5f93f6aff
Version: webpack 3.12.0
Time: 6271ms
              Asset       Size  Chunks                    Chunk Names
    index.15803c.js     5.1 MB       0  [emitted]  [big]  index
index.15803c.js.map    6.23 MB       0  [emitted]         index
         index.html  359 bytes          [emitted]

test5
ash: 15803c5d52b5f93f6aff
Version: webpack 3.12.0
Time: 5179ms
              Asset       Size  Chunks                    Chunk Names
    index.15803c.js     5.1 MB       0  [emitted]  [big]  index
index.15803c.js.map    6.23 MB       0  [emitted]         index
         index.html  359 bytes          [emitted]

打包平均耗时5537ms
打包体积5.1 MB
```

webpack4
```
test1
Hash: 0c7581fd5ea557636eb8
Version: webpack 4.41.5
Time: 5148ms
Built at: 2020-01-16 7:26:59 PM
              Asset       Size  Chunks                         Chunk Names
    index.0c7581.js      5 MiB   index  [emitted] [immutable]  index
index.0c7581.js.map    5.7 MiB   index  [emitted] [dev]        index
         index.html  359 bytes          [emitted]

test2
Hash: 0c7581fd5ea557636eb8
Version: webpack 4.41.5
Time: 4843ms
Built at: 2020-01-16 7:27:40 PM
              Asset       Size  Chunks                         Chunk Names
    index.0c7581.js      5 MiB   index  [emitted] [immutable]  index
index.0c7581.js.map    5.7 MiB   index  [emitted] [dev]        index
         index.html  359 bytes          [emitted]

test3
Hash: 0c7581fd5ea557636eb8
Version: webpack 4.41.5
Time: 4809ms
Built at: 2020-01-16 7:27:50 PM
              Asset       Size  Chunks                         Chunk Names
    index.0c7581.js      5 MiB   index  [emitted] [immutable]  index
index.0c7581.js.map    5.7 MiB   index  [emitted] [dev]        index
         index.html  359 bytes          [emitted]

test4
Hash: 0c7581fd5ea557636eb8
Version: webpack 4.41.5
Time: 5096ms
Built at: 2020-01-16 7:28:03 PM
              Asset       Size  Chunks                         Chunk Names
    index.0c7581.js      5 MiB   index  [emitted] [immutable]  index
index.0c7581.js.map    5.7 MiB   index  [emitted] [dev]        index

test5
Hash: 0c7581fd5ea557636eb8
Version: webpack 4.41.5
Time: 5194ms
Built at: 2020-01-16 7:28:14 PM
              Asset       Size  Chunks                         Chunk Names
    index.0c7581.js      5 MiB   index  [emitted] [immutable]  index
index.0c7581.js.map    5.7 MiB   index  [emitted] [dev]        index
         index.html  359 bytes          [emitted]

平均打包耗时5018ms
打包体积5 MiB
```
结论

```
webpck3
打包平均耗时5537ms
打包体积5.1 MB

webpck4
平均打包耗时5018ms
打包体积5 MiB

构建时间缩短大概10%
体积减少2%
```

#### webpck-dev-server 启动耗时对比
通常开发时会用到webpack-dev-server，测试使用改服务器启动时间对，分别独立运行三次。

webpack3 + webpack-dev-server@2.11.5

```
1.
Hash: ccfe82f8391dfcedad96
Version: webpack 3.12.0
Time: 6791ms

2.
Hash: ccfe82f8391dfcedad96
Version: webpack 3.12.0
Time: 7501ms

3.
Hash: ccfe82f8391dfcedad96
Version: webpack 3.12.0
Time: 7277ms

平均启动时间7189ms
```

webpack4 + webpack-dev-server@3.10.1
```
1.
Version: webpack 4.41.5
Time: 6068ms

2.
ersion: webpack 4.41.5
Time: 6774ms

3.
Time: 5862ms
Built at: 2020-01-16 7:42:58 PM

平均启动时间6234ms
```

启动时间提升约14%


#### 生产环境构建对比

webpack3
```
1.
Hash: 15803c5d52b5f93f6aff
Version: webpack 3.12.0
Time: 24791ms
              Asset       Size  Chunks                    Chunk Names
    index.15803c.js    1.39 MB       0  [emitted]  [big]  index
index.15803c.js.map    12.7 MB       0  [emitted]         index
         index.html  359 bytes          [emitted]

2.
Hash: 15803c5d52b5f93f6aff
Version: webpack 3.12.0
Time: 22074ms
              Asset       Size  Chunks                    Chunk Names
    index.15803c.js    1.39 MB       0  [emitted]  [big]  index
index.15803c.js.map    12.7 MB       0  [emitted]         index
         index.html  359 bytes          [emitted]

3.
Hash: 15803c5d52b5f93f6aff
Version: webpack 3.12.0
Time: 21517ms
              Asset       Size  Chunks                    Chunk Names
    index.15803c.js    1.39 MB       0  [emitted]  [big]  index
index.15803c.js.map    12.7 MB       0  [emitted]         index
         index.html  359 bytes          [emitted]

平均构建时间22794ms
打包体积1.39 MB
```
webpack4

```
1.
Hash: cf402c9b44795b072111
Version: webpack 4.41.5
Time: 8179ms
Built at: 2020-01-16 7:57:50 PM
              Asset       Size  Chunks                                Chunk Names
    index.cf402c.js   1.02 MiB       0  [emitted] [immutable]  [big]  index
index.cf402c.js.map   5.51 MiB       0  [emitted] [dev]               index
         index.html  359 bytes          [emitted]

2.
Hash: cf402c9b44795b072111
Version: webpack 4.41.5
Time: 8649ms
Built at: 2020-01-16 7:58:23 PM
              Asset       Size  Chunks                                Chunk Names
    index.cf402c.js   1.02 MiB       0  [emitted] [immutable]  [big]  index
index.cf402c.js.map   5.51 MiB       0  [emitted] [dev]               index
         index.html  359 bytes          [emitted]

3.
Hash: cf402c9b44795b072111
Version: webpack 4.41.5
Time: 8486ms
Built at: 2020-01-16 7:59:08 PM
              Asset       Size  Chunks                                Chunk Names
    index.cf402c.js   1.02 MiB       0  [emitted] [immutable]  [big]  index
index.cf402c.js.map   5.51 MiB       0  [emitted] [dev]               index
         index.html  359 bytes          [emitted]

平均构建耗时8438
打包体积1.02 MiB
```

升级后，打包构建时间缩短约63%；
体积减小约27%


### 其他构建优化方法(以webpack4为例)

#### splitChunks抽离公共代码
[https://juejin.im/post/5c00916f5188254caf186f80](https://juejin.im/post/5c00916f5188254caf186f80)


参考文章
[http://louiszhai.github.io/2019/01/04/webpack4/#%E6%8C%81%E7%BB%AD%E5%8A%A0%E9%80%9F](http://louiszhai.github.io/2019/01/04/webpack4/#%E6%8C%81%E7%BB%AD%E5%8A%A0%E9%80%9F)


[https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)



