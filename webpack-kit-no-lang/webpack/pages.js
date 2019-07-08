const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Root folder of pages
const root = path.resolve(__dirname, '../src/pages/');

const pages = fs.readdirSync(root);

// Generation entries
const pagesPaths = pages.reduce((acc, page) => ({ ...acc, [page]: path.join(root, page) }), {});

// Generation templates
const pageTemplates = pages.map(name => new HtmlWebpackPlugin({
  template: `./pages/${name}/index.pug`,         // Source
  filename: `${name}.html`,                         // Output
  emitFile: false,
  chunks: ['main', name],
}));

module.exports = {
  pages, pagesPaths, pageTemplates
};
