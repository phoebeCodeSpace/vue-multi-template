const cssnano = require('cssnano');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
const setMPA = require('./utils/setMPA')


const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    })
  ],

  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        ...setMPA.styles,
        commons: {
          test: /(vue)/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        }
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);