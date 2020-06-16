const merge = require('webpack-merge')
const common = require('./webpack.common')
const autoprefixer = require('autoprefixer')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: { plugins: () => [autoprefixer()] }
        },
        'sass-loader'
      ]
    }]
  }
})
