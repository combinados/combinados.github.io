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
const dir_build = path.join(__dirname, 'build');
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
        favicon: 'imagens/comb-animado.gif',
        template: 'layout/template.js',
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
        favicon: 'imagens/favicon.ico',
        template: 'layout/template.js',
        ambiente: producao ? "prod" : "dev",
        // minify: producao ? true : false,
        //		hash: true
    }),
    new CommonsChunkPlugin({
        name: "comum",
        filename: "js/comum.js",
        minChunks: 2 // How many times a dependency must come up before being extracted
    }),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'html/google-credentials.html')
    }]),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'css/externo/main.css')
    }]), new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'imagens/firebase-logo.png')
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
        new CleanPlugin('build'),
        new webpack.NoEmitOnErrorsPlugin(),
    ]);
} else {
    plugins = plugins.concat([
        new DashboardPlugin()
    ]);
}

let config = {
    cache: true,
    entry: {
        "vendor": ["nodep-date-input-polyfill", "babel-polyfill"],
        "admin": "./js/modulo-admin/modulo.js",
        "relatorios": "./js/modulo-relatorios/modulo.js"
    },
    output: {
        path: dir_build,
        publicPath: "",
        filename: "js/[name].bundle.js",
        // chunkFilename: "[name]-[id].chunk.js"
    },
    resolve: {
        alias: {
            'admin': path.join(__dirname, '')
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
                    path.join(__dirname, 'js'),
                    path.join(__dirname, 'componentes'),
                    path.join(__dirname, 'html'),
                    path.join(__dirname, 'layout'),
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
                    fallbackLoader: 'style-loader',
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
