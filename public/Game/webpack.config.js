const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: {
        game: "./src/main.js"
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
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
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
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "index.html"
        })
    ]
}