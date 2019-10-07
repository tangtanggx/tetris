const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve('./dist'), // 打包的根目录    解析成绝对路径
        filename: 'script/bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin()
    ],

    module: {
        rules:[
            {test: /.ts$/, use: {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            } }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js'] // webpack模块解析时默认只看js文件  例如 import ... from 'my.module'
    }
}