# camunda-modeler-webpack-plugin

[![Build Status](https://github.com/pinussilvestrus/camunda-modeler-webpack-plugin/workflows/CI/badge.svg)](https://github.com/pinussilvestrus/camunda-modeler-webpack-plugin/actions?query=workflow%3ACI)

Webpack plugin to easily configure Camunda Modeler extensions.

## Installation

```sh
npm i --save-dev camunda-modeler-webpack-plugin
```

## Usage

Add the plugin to your webpack config.

```js
const CamundaModelerWebpackPlugin = require('camunda-modeler-webpack-plugin');

module.exports = {
  plugins: [
    new CamundaModelerWebpackPlugin()
  ]
};
```

## Configuration

You can pass options to customize the resulting webpack configuration. 

For example, in case you build a plugin to only extend the Properties Panel without using JSX syntax:

```js
plugins: [
  new CamundaModelerWebpackPlugin({
    type: 'propertiesPanel',
    propertiesPanelLoader: false
  })
]
```

Following options are available:

| Name | Default | Description |
| ----------- | ----------- | ----------- |
| `propertiesPanelAlias` | true | Append Properties Panel `alias` configuration |
| `propertiesPanelLoader` | true | Append Properties Panel `babel-loader` configuration (requires `@babel/core` dependency) |
| `reactAlias` | true | Append React `alias` configuration |
| `reactLoader` | true | Append React `babel-loader` configuration (requires `@babel/core` dependency) |
| `type` |  | Specific type of the Camunda Modeler Plugin. Only [the configuration](./src/config/) of the given type will be appended. Allowed values: `react`, `propertiesPanel` |

## Resources

* [Camunda Modeler plugins documentation](https://docs.camunda.io/docs/components/modeler/desktop-modeler/plugins)
* [Camunda Modeler plugin helpers](https://github.com/camunda/camunda-modeler-plugin-helpers)

## License

MIT