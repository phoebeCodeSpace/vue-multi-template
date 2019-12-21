const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const { dest } = require('../config/project.config')
const setMPA = require('./utils/setMPA')

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: `./${dest}`,
    historyApiFallback: {
      rewrites: setMPA.rewrites
    },
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};

module.exports = merge(baseConfig, devConfig);