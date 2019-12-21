const path = require('path');

module.exports = {
  resolveLocal(...args) {
    return path.join(__dirname, '../../', ...args)
  },
  resolveAssetPath(dir) {
    return path.posix.join(`/${dir}`, '[name].[hash:8].[ext]')
  }
}