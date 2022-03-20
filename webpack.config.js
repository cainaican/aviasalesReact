const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.pug',
        minify: 'false',
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/images", to: "img/[name][ext]" },
        { from: "./src/fonts", to: "fonts/[name][ext]" },
        { from: "./src/json", to: "json/[name][ext]" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.pug$/,
        use: "pug-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  } 
}