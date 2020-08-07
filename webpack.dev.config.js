const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },
    devServer: {
        overlay: true,
        stats: 'errors-only',
        port: 3001,
        hot: true,
        historyApiFallback: true,
        contentBase: '/dist'
    },

    module: {
        rules: [
            {   
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpg|svg|gif|eot|otf|ttf|woff)$/,
                loader: 'file-loader',
                exclude: /node_modules/,
                options: {
                    publicPath: '/src/assets',
                    outputPath: '/dist/',
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin({
            banner: `Build: ${new Date().toLocaleDateString()}`
        }),

        new HtmlWebPackPlugin({
            template: './src/index.html',
        }),

        new CleanWebpackPlugin(),
    ],

    optimization: {

    },
};