const webpack = require('webpack'),
      path = require('path'),
      UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.join(__dirname),
    entry: {
        app: "./src/js/app.js"
    },
    output: {
        path: path.join(__dirname, "./dist/js"),
        filename: "[name].js",
    },
    resolve: {
        modules: [path.resolve('./src/js'), "node_modules"]
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize:true,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma: 6,
                    warnings: false,
                    compress: {
                        unused: true,
                        dead_code: true
                    },
                    ie8: false,
                    keep_classnames: false,
                    output: {
                        beautify: false,
                        comments: false
                    }
                }
            })
        ]
    }
}
