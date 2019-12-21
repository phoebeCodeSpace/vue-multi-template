const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolveLocal } = require('./resolve')
const pageConfig = require('../../config/pages.config')

module.exports = (() => {

  const entry = {}
  const htmlWebpackPlugins = []
  const rewrites = []

  pageConfig.map(page => {
    const { name, title, chunks } = page
    entry[name] = resolveLocal('src/pages/', name, 'index.js')
    /**
     * @see {@link https://github.com/jantimon/html-webpack-plugin#options}
     */
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title,
        filename: `${name}.html`,
        template: resolveLocal('public/index.html'),
        chunks: [...chunks, name]
      })
    )
    rewrites.push({
      from: new RegExp(name),
      to: `/${name}.html`
    })
  })

  return {
    entry,
    htmlWebpackPlugins,
    rewrites
  }
})()