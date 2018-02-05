> pageBuilder组件开发模版启动和打包项目的核心模版代码，方便更新和发版

本分支：专门为打包久组件的，没有前缀方案


# ChangeLog

1. 为了解决`babel: ReferenceError: _regeneratorRuntime is not defined`的问题而调整打包的入口。



问题：
1. webpack.config.js 中的entry使用相对路径不行  为啥  './src/app.js'
