const merge = require('webpack-merge');
const webpack = require('webpack');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const baseConfig = require('./webpack.base.config');
// const { assetsPath, resolve } = require('./utils');

module.exports = merge(baseConfig, {
  target: 'node',
  // devtool: '#source-map',
  entry: './src/entry/server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(styl(us)?|css|less|sass|scss|sss)$/,
        loader: 'null-loader',
      },
    ],
  },
  // stats: {
  //   entrypoints: false,
  //   children: false,
  //   modules: false,
  //   warnings: false,
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"',
    }),
    new VueSSRServerPlugin(),
  ],
});
