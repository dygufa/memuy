const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

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
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [["@babel/plugin-transform-runtime"]],
                        },
                    },
                    {
                        loader: "awesome-typescript-loader",
                    },
                ],
            }, {
                test: /\.css/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]"
                            }
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]"

                            }
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: ["./src"]
                            }
                        }
                    }
                ]
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
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
        ] : [
                new BundleAnalyzerPlugin()
            ]),
    ]
}
