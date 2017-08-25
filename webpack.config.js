const path = require('path');
const pxtorem = require('postcss-pxtorem');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = function(webpackConfig, env) {
  const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, 'src/assets'),  // 2. 自己私人的 svg 存放目录
  ];



  // 因为一个 SVG 文件不能被处理两遍. 在 atool-build 默认为 svg配置的svg-url-loade 里 exclude 掉需要 svg-sprite-loader处理的目录
  // https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js#L162
  // https://github.com/kisenka/svg-sprite-loader/issues/4
  webpackConfig.module.loaders.forEach(loader => {
    if (loader.test && typeof loader.test.test === 'function' && loader.test.test('.svg')) {
      loader.exclude = svgDirs;
    }
  });
  // 4. 配置 webpack loader
  webpackConfig.module.loaders.unshift({
    test: /\.(svg)$/i,
    loader: 'svg-sprite',
    include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
  });



  return webpackConfig;
}
