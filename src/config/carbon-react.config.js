module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
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
      '@carbon/react': 'camunda-modeler-plugin-helpers/@carbon/react',
      '@carbon/icons-react': 'camunda-modeler-plugin-helpers/@carbon/icons-react'
    }
  }
});