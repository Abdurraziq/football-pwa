const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  entry: {
    main: './src/main.js',
    index: './src/index.js',
    detail: './src/detail.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/assets/icons/favicon.ico',
      chunks: ['main', 'index']
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: './src/detail.html',
      favicon: './src/assets/icons/favicon.ico',
      chunks: ['main', 'detail']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/img/', to: 'assets/img/' },
        { from: './src/assets/icons/app-icon.png', to: 'assets/icons/' },
        { from: './src/assets/icons/broken-img.svg', to: 'assets/icons/' },
        { from: './src/assets/icons/icon-ios.png', to: 'assets/icons/' }
      ]
    }),
    new WebpackPwaManifest({
      name: 'Football-PWA',
      short_name: 'Football',
      description: 'Football Progressive Web Application',
      start_url: '/index.html',
      background_color: '#FFFFFF',
      theme_color: '#000000',
      icons: [{
        src: path.resolve('./src/assets/icons/icon-512x512.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: 'assets/icons'
      }],
      gcm_sender_id: '324074075219'
    }),
    new workboxPlugin.InjectManifest({
      swSrc: './src/scripts/service-worker/sw.js',
      swDest: 'sw.js'
    })
  ]
}
