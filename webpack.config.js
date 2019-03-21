const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      layouts: path.resolve(__dirname, 'src/layouts')
    },
    modules: [
      'src',
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src/components')
    ],
    mainFiles: ['index'],
    extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".css"]
  },

  module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

          // Scss
          { test: /\.scss$/, use: [
              "style-loader", // creates style nodes from JS strings
              "css-loader", // translates CSS into CommonJS
              "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
          },

          // Images
          { test: /\.(png|jpg)$/, loader: 'file-loader' }
      ]

  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],

};