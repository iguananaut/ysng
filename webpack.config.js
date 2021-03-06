const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        library: "YSNG"
    },
    module: {
        loaders: [
            /* Just copy all HTML files (of which there is only one) */
            {
                test: /\.html$/,
                loader: "file-loader",
                query: "name=[name].[ext]"
            },
            {
                test: /\.(jpg|css)$/,
                loader: "file-loader",
                query: "name=static/[name].[ext]&context=./static",
            }
        ]
    }
}
