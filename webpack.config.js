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
    favicon: 'comum/imagens/comb-animado.gif',
    template: 'comum/layout/template.js',
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
    favicon: 'comum/imagens/favicon.ico',
    template: 'comum/layout/template.js',
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
    from: path.resolve(__dirname, 'manifest.json')
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

console.log(plugins);

const config = {
  cache: true,
  entry: {
    "vendor": ["babel-polyfill"],
    "admin": "./modulo-admin/modulo.js",
    "relatorios": "./modulo-relatorios/modulo.js"
  },
  output: {
    path: path.resolve(__dirname, dir_build),
    publicPath: "",
    filename: "js/[name].bundle.js",
    // chunkFilename: "[name]-[id].chunk.js"
  },
  resolve: {
    alias: {
      "modulo-admin": path.join(__dirname, "modulo-admin"),
      "modulo-relatorios": path.join(__dirname, "modulo-relatorios"),
      "comum": path.join(__dirname, "comum")
    }
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
          path.join(__dirname, 'comum'),
          path.join(__dirname, 'modulo-admin'),
          path.join(__dirname, 'modulo-relatorios'),
          path.join(__dirname, 'node_modules', '@material')
        ],
        query: {
          cacheDirectory: true,
          presets: ['es2015', "stage-0"]
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true || { /* CSSNano Options */ }
              }
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
