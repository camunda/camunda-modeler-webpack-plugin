module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              [ require.resolve('@babel/plugin-transform-react-jsx'), {
                'importSource': '@bpmn-io/properties-panel/preact',
                'runtime': 'automatic'
              } ]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@bpmn-io/properties-panel': 'camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel',
      'bpmn-js-properties-panel': 'camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel'
    }
  }
});