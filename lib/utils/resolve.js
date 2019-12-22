const path = require('path');
const { publicPath } = require('../../config/project.config')

module.exports = {
  resolveLocal(...args) {
    return path.join(__dirname, '../../', ...args)
  },
  resolveAssetPath(dir) {
    return path.posix.join(`${publicPath}${dir}`, '[name].[hash:8].[ext]')
  },
  // resolveAssetPath(dir) {
  //   `${publicPath}js/[name].[contenthash].js`
  //   return path.posix.join(`${publicPath}${dir}`, '[name].[hash:8].[ext]')
  // }
}