const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./bundle.js",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".js"],
    plugins: [new TsConfigPathsWebpackPlugin()]
  },
  module: {
    rules: [
      // All files with a '.ts' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader", enforce: "pre" }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CopyWebpackPlugin([{
      context: './src/app',
      from: '**/*.html',
    }])
  ]
};
