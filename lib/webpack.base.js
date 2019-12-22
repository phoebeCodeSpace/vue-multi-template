const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { publicPath, outputDir } = require('../config/project.config')
const { resolveLocal, resolveAssetPath } = require('./utils/resolve')
const setMPA = require('./utils/setMPA')

const CSSRule = require('./utils/createCSSRule')

module.exports = {
  entry: setMPA.entry,
  output: {
    path: resolveLocal(outputDir),
    filename: `${publicPath}js/[name].[contenthash].js`
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {

          }
        }
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      },
      ...CSSRule,
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: resolveAssetPath('images'),
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: resolveAssetPath('fonts'),
            },
          },
        ],
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolveLocal('src')
    },
    extensions: ['.js', '.vue'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${publicPath}css/[name].[contenthash].css`,
      chunkFilename: `${publicPath}css/[id].[contenthash].css`,
    }),
    new webpack.DefinePlugin({
      /**
       * // TODO
       */
    }),
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    ...setMPA.htmlWebpackPlugins
  ],
  stats: 'errors-only'
}