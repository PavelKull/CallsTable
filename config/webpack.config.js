const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const projectRoot = path.resolve(__dirname, '..');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: path.resolve(projectRoot, 'src', 'index.tsx'),
    output: {
        path: path.resolve(projectRoot, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]__[hash:base64:5]',
                            },
                        },
                    },
                ],
            },

            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]__[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },

            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(projectRoot, 'public', 'index.html'),
        }),
    ],
    devServer: {
        static: path.resolve(projectRoot, 'dist'),
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: [
            {
                context: ['/ru/data/v3/testmethods'],
                target: 'https://test.v5.pryaniky.com',
                changeOrigin: true,
                secure: false,
            },
        ],
    },
};
