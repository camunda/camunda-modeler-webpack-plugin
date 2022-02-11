# camunda-modeler-webpack-plugins

[![Build Status](https://github.com/pinussilvestrus/camunda-modeler-webpack-plugins/workflows/CI/badge.svg)](https://github.com/pinussilvestrus/camunda-modeler-webpack-plugins/actions?query=workflow%3ACI)

Webpack plugins to easily configure Camunda Modeler extensions.

## Installation

```sh
npm i --save-dev camunda-modeler-webpack-plugins
```

## Usage

Add a plugin to your webpack config. For example to configure a React client extension:

```js
const ClientExtensionWebpackPlugin = require("camunda-modeler-webpack-plugins").ClientExtensionWebpackPlugin;

module.exports = {
  plugins: [
    new ClientExtensionWebpackPlugin()
  ]
};
```

or a properties panel extension:

```js
const PropertiesPanelWebpackPlugin = require("camunda-modeler-webpack-plugins").PropertiesPanelWebpackPlugin;

module.exports = {
  plugins: [
    new PropertiesPanelWebpackPlugin()
  ]
};
```

## Resources

* [Camunda Modeler plugins documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/plugins#plugging-into-the-camunda-modeler)
* [Camunda Modeler plugin helpers](https://github.com/camunda/camunda-modeler-plugin-helpers)

## License

MIT