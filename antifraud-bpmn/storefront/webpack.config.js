const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');


const prod = {
    optimization: {
        minimize: true
    }
};

const common = {
    context: __dirname,

    devtool: 'inline-sourcemap',

    resolve: {
        alias: {
            lib: path.resolve(__dirname, 'static/js/lib')
        },
        extensions: ['.js', '.jsx']
    },

    entry: {
        site: path.resolve(__dirname, "static/js/site.js"),
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].min.js"
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ejs$/,
                use: {
                    loader: 'ejs-loader'
                }
            },
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: null
        }),
        new webpack.IgnorePlugin(/jsdom$/)
    ]
};

let config = common;
if (!debug) {
    config = Object.assign({}, common, prod);
}

module.exports = config;
