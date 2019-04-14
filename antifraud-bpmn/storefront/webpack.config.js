const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');


const plugins = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new webpack.EnvironmentPlugin({
        NODE_ENV: null
    }),
    new webpack.IgnorePlugin(/jsdom$/)
];

const productionPlugins = [
    new webpack.optimize.UglifyJsPlugin()
];

module.exports = {
    context: __dirname,

    devtool: 'inline-sourcemap',

    resolve: {
        alias: {
            lib: path.resolve(__dirname, 'static/js/lib')
        },
        extensions: ['.js', '.jsx']
    },

    entry: {
        sample: path.resolve(__dirname, "static/js/sample.js"),
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].min.js"
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!(bunnyjs)\/).*/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    externals: {
        $: 'jquery'
    },

    plugins: plugins.concat(debug ? [] : productionPlugins)
};
