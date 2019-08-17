const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        publicPath: '/',
        path: __dirname + "src/dist",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test:/\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
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
                test: /\.(png|jpg|jpe|svg)$/,
                loader: 'url-loader',
                options : {
                    limit: 100000
                }
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
            filename: '[name].min.css',
          }),
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "index.html"
        })
    ]
}