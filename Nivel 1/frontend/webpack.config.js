const path = require("path");
const hetmlWebPackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval-source-map" : "source-map",

  entry: path.resolve(__dirname, "src", "index.jsx"),
  devServer: {
    compress: true,
    port: 9000,
    allowedHosts: "all",
    static: {
      directory: path.join(__dirname, "public"),
    },
    // contentBase: path.resolve(__dirname, "public"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new hetmlWebPackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: "file-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
};
