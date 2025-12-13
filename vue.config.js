module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/app-builder-ts/'
    : '/',
  chainWebpack: config => {
    config.plugins.delete('fork-ts-checker')
  }
}

