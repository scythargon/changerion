var webpack = require("webpack");
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WatchLiveReloadPlugin = require('webpack-watch-livereload-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const ExtractStyles = new ExtractTextPlugin({
  filename: `css/app.[contenthash].css`,
  allChunks: true
});

const isProd = !!process.env.FRONT_ENV;

const styles = function (use) {
  return ExtractStyles.extract({ use, fallback: 'style-loader' });
};

const cssLoader = {
  loader: 'css-loader',
};
const cssLoaderWithModules = {
  loader: 'css-loader',
  options: {
    modules: true,
    // localIdentName: options.dev ? '[local]__[hash:base64:5]' : '__[hash:base64:5]'
  }
};

module.exports = {
  entry: [
    './src/app.jsx',
    './assets/scss/main.scss'
  ],
  output: {
    path: path.join(__dirname, isProd ? './build_prod/' : './build/'),
    filename: 'js/main.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, './js'), 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
      },
      {
        test: /\.js[x]?$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.monk$/,
        loader: 'monkberry-loader'
      },
      { test: /\.less$/, include: /node_modules/, use: styles([cssLoader, 'less-loader']) },
      { test: /\.less$/, exclude: /node_modules/, use: styles([cssLoaderWithModules, 'less-loader']) },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'babel-loader?presets[]=es2015,presets[]=react!svg-react-loader' },
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/main.css'),
    !isProd ? new WatchLiveReloadPlugin({
      files: [
        'monks_index.html',
        'build/css/main.css',
        'build/js/main.js',
      ]
    }) : new UglifyJsPlugin({
      parallel: true,
      cache: true,
    }),
  ]
};
