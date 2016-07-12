var webpack = require('webpack'),
    path = require('path'),

    componentPath = path.resolve('./src/js');

module.exports = {
  context: path.join(__dirname), 
  entry: [
    "./src/js/app.js"
  ],
  output: {
    path: path.join(__dirname, "./dist/js"),
    filename: "[name].js"
  },
  resolve: {
    root: componentPath,
    fallback: path.join(__dirname, "helpers")
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  externals: [{
    'handlebars/runtime': {
      root: 'Handlebars',
      commonjs2: 'handlebars/runtime',
      commonjs: 'handlebars/runtime'
    },
    'handlebars': {
      root: 'Handlebars',
      amd: 'Handlebars',
      commonjs: 'handlebars',
      commonjs2: 'handlebars'
    }
  }],
  module: {
    loaders: [{
       test: /\.hbs$/,
       loader: 'handlebars-loader',
       runtime: 'handlebars/runtime'
    }]
  }
}
