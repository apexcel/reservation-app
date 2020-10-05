const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.tsx'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist/'),
        publicPath: '/'
    },

    resolve: {
        alias: {
            Utils: path.resolve(__dirname, "utils/"),
            Atoms: path.resolve(__dirname, "src/atoms/"),
            Api: path.resolve(__dirname, "api/"),
            Components: path.resolve(__dirname, "src/components/"),
            Reducers: path.resolve(__dirname, "src/reducers/"),
            Styles: path.resolve(__dirname, "src/styles/"),
        }
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
                    transpileOnly: true
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
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new Dotenv()
    ],

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
};