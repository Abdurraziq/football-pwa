const merge = require('webpack-merge')
const common = require('./webpack.common')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: { plugins: () => [autoprefixer()] }
        },
        'sass-loader'
      ]
    }]
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'assets/css/[name].css' })]
})
