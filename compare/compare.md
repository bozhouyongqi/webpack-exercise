
### webpack4升级初体验

#### webpack4改动点 [https://v4.webpack.js.org/migrate/4/](http://)

```
1. 不再支持node v4,需要更新到node v6版本或者更高
2. webpack cli工具单独抽离了出来，需要单独安装才能使用
3. 需要更新或替换部分插件以适配webpack4,例如extractTextPlugin插件，可以用mini-css-extract-plugin插件代替
4. webpack4提供了mode配置选项，以实现开发环境或者生产环境的一键配置或者零配置，其中生产环境中默认启动了一些插件优化，例如代码压缩，tree-shaking等
5.增加了更多内置的优化选项。如不在需要使用CommonsChunkPlugin，使用optimization.splitChunks配置选项即可
```

#### webpack3/webpack4开发环境与生产环境的对比

##### 开发环境编译时间对比
```
webpack3


```