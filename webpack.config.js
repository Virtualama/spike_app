// var webpack = require('webpack');

// var commonsPlugin =
//   new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: './js/app.js',
  output: {
    path: './build/',
    filename: 'bundle.js',
    publicPath: './build/'
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.png$/, loader: 'file?name=images/[name].[ext]' }
    ]
  },


  // resolve: {
  //   // extensions: ['', '.html', '.js', '.json', '.scss', '.css'],
  //   alias: {
  //     // leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
  //     leaflet_marker: 'leaflet/dist/images/marker-icon.png',
  //     leaflet_marker_2x: __dirname + "/node_modules/leaflet/dist/images/marker-icon-2x.png",
  //     leaflet_marker_shadow: __dirname + "/node_modules/leaflet/dist/images/marker-shadow.png"
  //   }
  // },

  // plugins: [commonsPlugin]

  // watch: true
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       loader: 'babel-loader',
  //       query: {
  //         presets: ['es2015', 'react']
  //       }
  //     }
  //   ]
  // }
}


// 'use strict'

// var webpack = require('webpack'),
//     path = require('path')
//     // HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports = {
//   target: "web",
//   cache: true,
//   entry: {
//     bundle: './js/app.js'
//   },
//   resolve: {
//     extensions: ['', '.html', '.js', '.json', '.scss', '.css'],
//     alias: {
//       leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
//       leaflet_marker: __dirname + "/node_modules/leaflet/dist/images/marker-icon.png",
//       leaflet_marker_2x: __dirname + "/node_modules/leaflet/dist/images/marker-icon-2x.png",
//       leaflet_marker_shadow: __dirname + "/node_modules/leaflet/dist/images/marker-shadow.png"
//     }
//   },
//   module: {
//     loaders: [
//     // {test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader"},
//     // {test: /\.scss?$/, exclude: /node_modules/, loader: "style-loader!css-loader!sass-loader!"},
//     {test: /\.css?$/, loader: "style-loader!css-loader!"},
//     {test: /\.(png|jpg)$/, loader: "file-loader?name=images/[name].[ext]"}
//     ]
//   },
//   plugins: [
//   new webpack.optimize.CommonsChunkPlugin("common", "common.js"),
//   // new HtmlWebpackPlugin({
//   //   inject: true,
//   //   template: "src/index.html"
//   // }),
//   new webpack.NoErrorsPlugin()
//   ],
//   output: {
//     path: path.join(__dirname, "dist"),
//     publicPath: "/dist/",
//     filename: "[name].js",
//     pathInfo: true
//   }
// }
