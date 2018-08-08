var path = require('path')

module.exports = {
  entry: {
    bundle: ['./src/components/index.tsx']
  },
  context: path.resolve(__dirname),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'temp')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // exclude: /node_modules/,
        // include: path.join(__dirname, '/node_modules/antd'),
        use: [
          'css-hot-loader',
          // 'css-loader?importLoaders=1&localIdentName=[local]_[hash:base64:6]',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[local]_[hash:base64:6]',
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              ident: 'postcss'
              // plugins: () => [require('autoprefixer')({
              //   'browsers': ['> 1%', 'last 2 versions']
              // })]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|ico|cur|woff(2)?)(\?[=a-z0-9]+)?$/,
        // use: 'url-loader?limit=1000&name=dist/images/[hash:6].[ext]'
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1 * 1024,
            name: 'dist/images/[hash:6].[ext]',
            fallback: 'file-loader'
          }
        }]
      },
      // {
      //   test: /\.woff(2)$/,
      //   use: 'url-loader?limit=10000&name=fonts/[hash].[ext]&mimetype=application/font-woff'
      // },
      {
        test: /\.(ttf|eot|otf)(\?[\s\S]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash:6].[ext]',
            outputPath: 'fonts/',
            publicPath: 'dist'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}
