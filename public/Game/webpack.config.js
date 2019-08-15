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
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            teplate: "./src/index.html",
            filename: "./src/index.html"
        })
    ]
}