module.exports = {
  devtool: 'eval',
  resolve: { extensions: ['.js', '.jsx', '.json'] },
  module: {
    // Using loaders instead of rules to preserve webpack 1.x compatibility
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: []
};
