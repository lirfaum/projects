const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Blacklist
const blacklist = getBlacklist();

// Root folder of lands
const root = path.resolve(__dirname, '../src/pages');

// Getting list of lands
const lands = fs.readdirSync(root).filter(file => !blacklist.includes(file));

// Generation entries
const paths = lands.reduce((acc, land) => ({ ...acc, [land]: path.join(root, land) }), {});

// Generation templates
const templates = lands.map(name => new HtmlWebpackPlugin({
  template: `./pages/${name}/index.pug`,         // Source
  filename: `${name}.html`,                         // Output
  emitFile: false,
  chunks: [name, 'main'],
}));

module.exports = {
  lands, paths, templates,
};

function getBlacklist() {
  const configPath = path.resolve(__dirname, '../black.list');
  if (fs.existsSync(configPath)) {
    const loaded = fs.readFileSync(configPath, { encoding: 'utf8' });
    if (loaded) return loaded.split(/\n/).filter(name => !name.startsWith('#'));
  }
  console.log('Pages configuration file not found!');
}
