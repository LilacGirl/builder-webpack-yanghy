const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');
/**
 * 代码压缩
 * 文件指纹
*/
const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendors: {
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = merge(prodConfig, baseConfig);
