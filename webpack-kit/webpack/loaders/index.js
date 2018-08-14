const util = require('../util');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.js$/,
    use: { 
      loader: 'babel-loader',
    },
  },
  {
    test: /\.pug$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          attrs: [':data-src', ':src', ':href']
        }
      },
      {
        loader: 'pug-html-loader',
        options: { pretty: true }
      }
    ]
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          minimize: false,
        }
      },
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'sass-loader?sourceMap',
        options: {
          minimize: false,
        }
      },
    ],
  },
  {
    test: /\.(woff2?|ttf|eot)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: util.filePath('assets/fonts/[name]'),
        },
      },
    ],
  },
  {
    test: /\.(gif|ico|png|jpe?g|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: util.filePath('assets/images/[name]'),
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          optipng: {
            enabled: true,
          },
          pngquant: {
            quality: 80,
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
        },
      },
    ],
  },
];
