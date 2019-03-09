const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackConfig = require('./webpack.config.common');

const buildPath = path.resolve(__dirname, '../../dist/');

const prodConfig = webpackMerge(webpackConfig, {
  mode: 'development',
  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  module: {},

  plugins: [
    new CopyWebpackPlugin([{ from: 'static', to: 'static' }]),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
  ],
});

module.exports = prodConfig;
