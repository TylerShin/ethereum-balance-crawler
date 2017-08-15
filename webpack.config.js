const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, "dst"),
    filename: "handler.js",
  },
  target: "node",
  resolve: {
    extensions: [".js"],
  },
  devServer: {
    allowedHosts: [".lvh.me", "localhost"],
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  module: {
    rules: [
      {
        test: [/\.js?$/, /\.jsx?$/],
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
