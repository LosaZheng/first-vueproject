const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
// css 外链式插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 路由插件
const vueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry: path.join(__dirname, "./views/main.js"),
    output: {
        path: path.join(__dirname, "./dist"),
        filename: 'bundle.js',
    },
    //添加插件节点
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, "./views/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),
        new vueLoaderPlugin(),
    ],
    module: {
        rules: [
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
            { test: /\.(woff2?|woff|eot|ttf|otf|svg)(\?.*)?$/, use: 'file-loader' },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:8].[ext]'
                }
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.vue$/, use: "vue-loader" },
        ]
    }
}