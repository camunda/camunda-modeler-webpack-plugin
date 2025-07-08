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
      '@carbon/react': 'camunda-modeler-plugin-helpers/vendor/@carbon/react',
      '@carbon/icons-react': 'camunda-modeler-plugin-helpers/vendor/@carbon/icons-react'
    }
  }
});