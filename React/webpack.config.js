const path = require('path');
const webpack = require('webpack');

module.exports = () => ({
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader']
            }
        ]
    },
    devServer: {
        overlay: true,
        host: 'localhost',
        port: 8080,
        historyApiFallback: true
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production')
        })
    ]
})