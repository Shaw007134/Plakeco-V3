var HtmlWebpackPlugin = require("html-webpack-plugin");
var OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    main: "./js/main.js"
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  // mode: "production",
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: "url-loader?limit=8192"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello webpack',
      template: 'src/component/index.html',
      inject: 'body',
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),
    new ExtractTextPlugin("[name].css"),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"), // 引入cssnano配置压缩选项
      cssProcessorPluginOptions: {
        preset: ["default", {
          discardComments: {
            removeAll: true
          }
        }]
      },
      canPrint: true
    })
  ]
};
