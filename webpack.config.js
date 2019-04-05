const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "docs/js")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader"}
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {loader: "svg-url-loader?stripdeclarations&encoding=base64"}
        ]
      }
    ]
  }
}
