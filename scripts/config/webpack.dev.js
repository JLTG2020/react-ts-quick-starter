const Webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const paths = require('../paths');

module.exports = merge(common, {
  // 将webpack.common中的东西导入
  mode: 'development',
  devtool: 'eval-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js', // 输出文件名字
    path: paths.appBuild, // 输出文件路径
  },
  devServer: {
    compress: true, // 是否启用gzip压缩
    stats: 'errors-only', // 终端仅打印error
    clientLogLevel: 'silent', // 日志等级
    open: true, // 打开默认浏览器
    hot: true, // 是否热更新
    noInfo: true,
    proxy: {
      // 代理IP
      ...require(paths.appProxySetup),
    },
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(), new ErrorOverlayPlugin()],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
});
