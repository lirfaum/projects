const path = require('path');
const pages = require('./pages');
const loaders = require('./loaders');
const util = require('./util');

const development = !!process.env.DEV;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [
  new MiniCssExtractPlugin({
    filename: util.filePath('assets/styles/[name]', '.css'),
  }),
];

//-- Register all pages templates --//
plugins.push(...pages.pageTemplates);

const config = {
  entry: {  main: path.join(__dirname, '../src'), ...pages.pagesPaths },
  context: path.resolve(__dirname, '../src'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: util.filePath('assets/scripts/[name]', '.js'),
  },
  mode: development ? 'development' : 'production',
  resolveLoader: {
    alias: {
      'pug-html-loader': path.join(__dirname, 'loaders', 'pug-html-loader'),
    }
  },
  resolve: {
    alias: util.getAliases(),
  },
  module: {
    rules: loaders,
  },
  stats: {
    all: true,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  },
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,
  },
  plugins,
};

if (development) {
  config.devtool = 'source-map';
}

module.exports = config;
