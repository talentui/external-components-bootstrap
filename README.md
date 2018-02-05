> pageBuilder组件开发模版启动和打包项目的核心模版代码，方便更新和发版

本分支：专门为打包久组件的，没有前缀方案

# Version

## x.x.x-noprefix:

> 为了打包已经开发的组件，去掉前缀方案的版本分支。
因为后端接口已经全部迁移，但是组件接口和前端页面并为迁移，为了兼容两个pageBuilder渲染站点，所以旧的组件没有增加前缀。但是以后新增的组件统一加前缀。以后是否需要全部加上，待商榷

### 1.3.1-noprefix

1. 为了解决`babel: ReferenceError: _regeneratorRuntime is not defined`的问题而调整打包的入口。

## master主分支


问题：
1. webpack.config.js 中的entry使用相对路径不行  为啥  './src/app.js'
