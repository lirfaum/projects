const util = require('../util');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          workers: -1,
          workerParallelJobs: 70,
          workerNodeArgs: ['--max-old-space-size=2048'],
          poolRespawn: false,
          poolTimeout: 2000,
          poolParallelJobs: 250,
          name: "my-pool"
        }
      },
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ]
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
          name: util.filePath('[path][name]'),
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 85,
          },
          optipng: {
            enabled: true,
          },
          pngquant: {
            quality: 90,
            speed: 10,
          },
          gifsicle: {
            interlaced: false,
          },
        },
      },
    ],
  },
];
