const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.js",
  devServer: {
    port: 4205,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: { '/api': 'http://localhost:5000' },
  },
  output: {
    publicPath: "http://localhost:4205/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfeOrders",
      filename: "remoteEntry.js",
      exposes: {
        "./OrdersApp": "./src/OrdersApp.js",
        "./AddToCartButton": "./src/components/AddToCartButton.jsx",
        "./CartBadge": "./src/components/CartBadge.jsx",
        "./CartStore": "./src/store/cartStore.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
        "react-router-dom": { singleton: true, requiredVersion: false },
        "react-redux": { singleton: true, requiredVersion: false },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
