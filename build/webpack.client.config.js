const merge = require('webpack-merge');
const webpack = require('webpack');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const { resolve, isProd, assetsPath } = require('./utils');

const config = merge(baseConfig, {
  entry: {
    app: './src/entry/client.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueSSRClientPlugin(),
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"',
    }),
  ],
  optimization: {},
});

if (isProd) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[chunkhash].css'),
    }),
  );
  config.optimization.minimizer = [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css(\?.*)?$/,
    }),
    new TerserPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    }),
  ];
}

module.exports = config;
