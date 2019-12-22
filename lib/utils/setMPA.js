const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolveLocal } = require('./resolve')
const pageConfig = require('../../config/pages.config')

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = (() => {

  const entry = {}
  const htmlWebpackPlugins = []
  const rewrites = []
  const styles = {}

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
    /**
     * @see {@link https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-css-based-on-entry}
     */
    styles[`${name}Styles`] = {
      name,
      test: (m, c, entry = name) =>
        m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
      chunks: 'all',
      enforce: true,
    }

    rewrites.push({
      from: new RegExp(name),
      to: `/${name}.html`
    })
  })

  return {
    entry,
    htmlWebpackPlugins,
    rewrites,
    styles
  }
})()