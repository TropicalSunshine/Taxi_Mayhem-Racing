const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        publicPath: './',
        path: __dirname + "/dist",
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  'css-loader',
                ],
              },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
          }),
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "index.html"
        })
    ]
}