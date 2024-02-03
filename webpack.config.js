const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devServer: {
    compress: true,
    port: 3000,
    static: path.join(__dirname, 'dist'),
  },

  devtool: 'source-map',
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/custom.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/images', to: 'img' },
        { from: './src/particles', to: 'particles' },
      ],
    }),
  ],

  resolve: {
    extensions: ['.ts', '.js'],
  },
};
