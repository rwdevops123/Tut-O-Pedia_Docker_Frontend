const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  //  entry: "./src/index.js",
  entry: "./src/Components/TitleBar.tsx",
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset/resource",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.[hash].js",
  },
  plugins: [new HtmlWebpackPlugin()],
};
