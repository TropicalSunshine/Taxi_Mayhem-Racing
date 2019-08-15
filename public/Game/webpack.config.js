const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module : {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            title: "Taxi.io",
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            teplate: "./src/index.html",
            filename: "./index.html"
        })
    ]
}