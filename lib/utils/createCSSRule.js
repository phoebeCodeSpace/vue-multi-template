const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { preProcessors } = require('../../config/project.config')
const devMode = process.env.NODE_ENV !== 'production';
const { resolveLocal } = require('./resolve')

const preProcessorsRules = {
  'less': {
    test: /.less$/,
    loader: 'less-loader',
    options: {
      modifyVars: {
        'hack': `true; @import "${resolveLocal('config')}/theme.config.less";`
      }
    }
  },
  'scss': {
    test: /\.(sa|sc|c)ss$/,
    loader: 'sass-loader'
  },
  'sass': {
    test: /\.(sa|sc|c)ss$/,
    loader: 'sass-loader',
  }
}

const { test, loader: preProcessorsLoader, options = {} } = preProcessorsRules[preProcessors]


module.exports = [
  {
    test: /.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      'css-loader',
      'postcss-loader'
    ]
  },
  {
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
      {
        loader: preProcessorsLoader,
        options
      }
    ],
  }
]

