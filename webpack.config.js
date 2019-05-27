const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const src = `${__dirname}/src`

module.exports = (_, { mode = 'development' }) => {
  const isProduction = mode === 'production'
  return {
    mode,
    entry: './src/main.js',
    output: {
      filename: `js/[name].[${isProduction ? 'contenthash' : 'hash'}].js`
    },
    resolve: {
      extensions: ['.mjs', '.js', '.svelte', '.json'],
      alias: { '@': src }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
      new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' })
    ],
    module: {
      rules: [
        { test: /\.js$/, include: src, loader: 'babel-loader' },
        {
          test: /\.svelte$/,
          include: src,
          loader: 'svelte-loader',
          options: {
            hotReload: false,
            emitCss: true
          }
        },
        {
          test: /\.css$/,
          include: src,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: !isProduction }
            },
            'css-loader'
          ]
        }
      ]
    },
    devServer: {
      port: 9876,
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true
    }
  }
}
