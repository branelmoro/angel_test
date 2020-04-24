const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const browserConfig = {
    mode: "development",
    entry: './src/browser.js',
    // target: 'web',
    output: {
        path: path.resolve(__dirname + '/build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    // devServer: {
    //     contentBase: './build',
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            }
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: path.resolve('./index.html'),
    //     }),
    // ],
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: true
        })
    ],
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".json"]
    }
};

const serverConfig = {
    mode: "development",
    entry: './src/server.js',
    target: 'node',
    // node: {
    //     __dirname: true,
    //     __filename: true
    // },
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname),
        publicPath: '/',
        filename: 'server.js'
    },
    // devServer: {
    //     contentBase: './build',
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            }
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: path.resolve('./index.html'),
    //     }),
    // ]
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: false
        })
    ],
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".json"]
    }
};

module.exports = [browserConfig, serverConfig];
