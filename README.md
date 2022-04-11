# camunda-modeler-webpack-plugin

[![Build Status](https://github.com/pinussilvestrus/camunda-modeler-webpack-plugin/workflows/CI/badge.svg)](https://github.com/pinussilvestrus/camunda-modeler-webpack-plugin/actions?query=workflow%3ACI)

Webpack plugin to easily configure Camunda Modeler extensions.

## Installation

```sh
npm i --save-dev camunda-modeler-webpack-plugin
```

## Usage

Add a plugin to your webpack config. For example to configure a React client extension:

```js
const ModelerPlugin = require('camunda-modeler-webpack-plugin');

module.exports = {
  plugins: [
    new ModelerPlugin()
  ]
};
```

or a properties panel extension:

```js
const ModelerPlugin = require('camunda-modeler-webpack-plugin');

module.exports = {
  plugins: [
    new ModelerPlugin({
      type: 'propertiesPanel'
    })
  ]
};
```

## Configuration

You can pass configuration options to the plugins: 

```js
plugins: [
  new ModelerPlugin({
    type: 'propertiesPanel',
    loader: false
  })
]
```

| Name | Default | Description |
| ----------- | ----------- | ----------- |
| `alias` | true | Append `alias` configuration |
| `loader` | true | Append `babel-loader` configuration (requires `@babel/core` dependency) |
| `type` | 'react' | Type of the Camunda Modeler Plugin, allowed values: `react`, `propertiesPanel` |

## Resources

* [Camunda Modeler plugins documentation](https://docs.camunda.io/docs/components/modeler/desktop-modeler/plugins)
* [Camunda Modeler plugin helpers](https://github.com/camunda/camunda-modeler-plugin-helpers)

## License

MIT