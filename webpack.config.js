const path = require("path");
const webpack = require("webpack");
const combineLoaders = require("webpack-combine-loaders");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PRODUCTION_MODE = process.env.NODE_ENV === "production";

module.exports = {
    entry: "./src/index",
    output: {
        publicPath: "/",
        filename: "bundle.[hash].js",
        path: path.join(__dirname, "/dist"),
        pathinfo: true
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader?presets[]=es2015,plugins[]=transform-runtime!awesome-typescript-loa" +
                        "der"
            }, {
                test: /\.css/,
                loader: combineLoaders([
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        query: {
                            modules: false,
                            importLoaders: 1,
                            localIdentName: "[local]"
                        }
                    }
                ])
            }, {
                test: /\.scss$/,
                loader: combineLoaders([
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        query: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        }
                    }, {
                        loader: "sass-loader",
                        query: {
                            includePaths: ["./src"]
                        }
                    }
                ])
            }, {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                loader: "url-loader?mimetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
                loader: "file-loader?name=[name].[ext]"
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    // 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
        new HtmlWebpackPlugin({
            title: "Memuy", 
            filename: "index.html", 
            template: "src/index.html"
        }),
        ...(PRODUCTION_MODE ? [
            new UglifyJsPlugin()
        ]: [
            new BundleAnalyzerPlugin()
        ]),       
    ]
}