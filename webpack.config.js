const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ProvidePlugin } = require('webpack');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const environment = require('./configuration/environment');

function ppath(p) {
  return path.join(__dirname, p);
}

const templateFiles = fs
  .readdirSync(environment.paths.source)
  .filter((file) => ['.html', '.ejs'].includes(path.extname(file).toLowerCase()))
  .map((filename) => ({
    input: filename,
    output: filename.replace(/\.ejs$/, '.html'),
  }));

const htmlPluginEntries = templateFiles.map(
  (template) => new HTMLWebpackPlugin({
    inject: true,
    hash: false,
    minify: false,
    filename: template.output,
    template: path.resolve(environment.paths.source, template.input),
  }),
);

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'js', 'app.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                silenceDeprecations: ['mixed-decls'],
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:6][ext]',
        },
      },
    ],
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name(module) {
    //         // получает имя, то есть node_modules/packageName/not/this/part.js
    //         // или node_modules/packageName
    //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

    //         // имена npm-пакетов можно, не опасаясь проблем, использовать
    //         // в URL, но некоторые серверы не любят символы наподобие @
    //         return `${packageName.replace('@', '')}`;
    //       },
    //     },
    //   },
    // },
  },
  resolve: {
    alias: {
      jquery: ppath('node_modules/jquery/dist/jquery'),
      'inputmask.dependencyLib': ppath('node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib'),
      inputmask: ppath('node_modules/jquery.inputmask/dist/inputmask/inputmask'),
      'jquery.inputmask': ppath('node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask'),
      'inputmask.numeric.extensions': ppath('node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions'),
      'jquery.Lazy': ppath('node_modules/jquery-lazy/jquery.lazy'),
    },
  },
  plugins: [
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(png|gif|jpe?g)$/i,
        options: {
          quality: 90,
        },
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'images'),
          to: path.resolve(environment.paths.output, 'images'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
      ],
    }),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ].concat(htmlPluginEntries),
  target: 'web',
};
