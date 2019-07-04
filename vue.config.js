module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('txt')
      .test(/\.txt$/)
      .use('raw-loader')
        .loader('raw-loader')
        .end()
  }
}
