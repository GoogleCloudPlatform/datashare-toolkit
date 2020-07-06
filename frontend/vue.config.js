const path = require('path');

module.exports = {
  devServer: {
    host: 'localhost'
  },
  publicPath: process.env.BUCKET_NAME ? `/${process.env.BUCKET_NAME}/` : '/',
  chainWebpack: config => {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.VUE_APP_APICLIENT == 'server'
    ) {
      // mutate config for production...
      console.log('Running in the api-client [server] mode...');
      config.resolve.alias.set(
        'api-client',
        path.resolve(__dirname, 'src/api/server/index.js')
      );
    } else {
      // mutate for development...
      console.log('Running in the api-client [mock] mode...');
      config.resolve.alias.set(
        'api-client',
        path.resolve(__dirname, 'src/api/server/index.js')
      );
    }
  }
};
