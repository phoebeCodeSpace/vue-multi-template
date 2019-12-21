const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { preProcessors } = require('../../config/project.config')
const devMode = process.env.NODE_ENV !== 'production';

const preProcessorsRules = {
  'less': {
    test: /.less|.css$/,
    loader: 'less-loader',
  },
  'scss': {
    test: /\.(sa|sc|c)ss$/,
    loader: 'sass-loader',
  },
  'sass': {
    test: /\.(sa|sc|c)ss$/,
    loader: 'sass-loader',
  }
}

const { test, loader: preProcessorsLoader } = preProcessorsRules[preProcessors]

module.exports = {
  test,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: devMode,
        reloadAll: true,
      },
    },
    'css-loader',
    'postcss-loader',
    preProcessorsLoader
  ],
}