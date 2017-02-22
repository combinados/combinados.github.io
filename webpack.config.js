const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const CleanPlugin = require('clean-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const dir_build = "2017";
const producao = process.env.AMBIENTE === 'producao';

let plugins = [
    new ExtractTextPlugin({
        filename: "css/[name].css",
        disable: false,
        allChunks: true
    }),
    new HtmlWebpackPlugin({
        title: "Módulo Administrativo",
        filename: 'admin.html',
        excludeChunks: ['relatorios'],
        favicon: 'componentes/comum/imagens/comb-animado.gif',
        template: 'componentes/layout/template.js',
        producao,
        // minify: {},
        minify: {
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeCDATASectionsFromCDATA: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeAttributeQuotes: true,
            useShortDoctype: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            removeScriptTypeAttributes: true,
            removeStyleTypeAttributes: true,
        },
    }),
    new HtmlWebpackPlugin({
        title: "Módulo Relatórios",
        filename: 'relatorios.html',
        excludeChunks: ['admin'],
        favicon: 'componentes/comum/imagens/favicon.ico',
        template: 'componentes/layout/template.js',
        producao,
        // minify: producao ? true : false,
        //		hash: true
    }),
    new CommonsChunkPlugin({
        name: "comum",
        filename: "js/comum.js",
        minChunks: 2 // How many times a dependency must come up before being extracted
    }),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'componentes/comum/html/google-credentials.html')
    }]),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'componentes/comum/css/externo/main.css')
    }]), new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'componentes/comum/imagens/firebase-logo.png')
    }]),
    // new CopyWebpackPlugin([{
    //     from: path.resolve(__dirname, 'html/index.html')
    // }]),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: {}
        }
    })
];

if (producao) {
    plugins = plugins.concat([
        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new CleanPlugin(dir_build),
        new webpack.NoEmitOnErrorsPlugin(),
    ]);
} else {
    plugins = plugins.concat([
        new DashboardPlugin()
    ]);
}

const config = {
    cache: true,
    entry: {
        "vendor": ["nodep-date-input-polyfill", "babel-polyfill"],
        "admin": "./componentes/modulo-admin/modulo.js",
        "relatorios": "./componentes/modulo-relatorios/modulo.js"
    },
    output: {
        path: path.resolve(__dirname, dir_build),
        publicPath: "",
        filename: "js/[name].bundle.js",
        // chunkFilename: "[name]-[id].chunk.js"
    },
    resolve: {
        alias: {
            "comum": path.join(__dirname, "componentes/comum"),
            "componentes": path.join(__dirname, "componentes")
        },
    },
    plugins: plugins,
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.join(__dirname, 'componentes'),
                    path.join(__dirname, 'node_modules', '@material')
                ],
                options: {
                    "presets": [
                        ["es2015", {
                            "modules": false
                        }]
                    ]
                }
            },
            {
                test: /\.html$/,
                // loader: 'html-loader',
                loader: 'babel-loader?presets[]=es2015!es6-template-string-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: [{
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            query: {
                                plugins: () => [precss, autoprefixer]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            query: {
                                includePaths: [path.resolve(__dirname, "node_modules")]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                loader: "url-loader",
                query: {
                    "limit": 1024,
                    "name": "imagens/[name]-[hash].[ext]"
                }
            }
        ]
    },
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    // devtool: producao ? false : 'inline-source-map',
    devtool: producao ? false : 'source-map',
    devServer: {
        // headers: { "content-type": "text/html" },
        historyApiFallback: true,
        contentBase: dir_build,
        proxy: {
            "/reinaldo/api/*": {
                target: producao ? "https://dessolucoes.reinaldo" : "http://localhost:8080",
                secure: false
            }
        },
        port: 9000,
        quiet: true
    }
};

module.exports = config;
