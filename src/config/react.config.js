module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [ require.resolve('@babel/preset-react') ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      react: 'camunda-modeler-plugin-helpers/vendor/react'
    }
  }
});