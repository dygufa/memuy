var path = require("path");
var webpack = require("webpack");
var combineLoaders = require("webpack-combine-loaders");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "babel?presets[]=es2015,plugins[]=transform-runtime!awesome-typescript-loader"
            },
            {
                test: /\.css/,
                loader: combineLoaders([
                    {
                        loader: "style"
                    },
                    {
                        loader: "css",
                        query: {
                            modules: false,
                            importLoaders: 1,
                            localIdentName: "[local]"
                        }
                    }
                ])
            },
            {
                test: /\.scss$/,
                loader: combineLoaders([
                    {
                        loader: "style"
                    },
                    {
                        loader: "css",
                        query: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        }
                    },
                    {
                        loader: "sass",
                        query: {
                            includePaths: [
                                "./src"
                            ]
                        }
                    }
                ])
            },
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                loader: "url-loader?mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                loader: "file-loader?name=[name].[ext]"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    // 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/index.html" }
        ])
    ]
}