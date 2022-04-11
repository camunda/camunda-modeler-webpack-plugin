const defaultOptions = {
  type: '',
  alias: true,
  loader: true
};

const CONFIG_PATHS = {
  'react': './config/react.config.js',
  'propertiesPanel': './config/propertiesPanel.config.js'
};

const DEFAULT_TYPE = 'react';

class CamundaModelerWebpackPlugin {

  /**
   * Webpack plugin to easily configure Camunda Modeler extensions.
   *
   * @param {Object} [options]
   * @param {string} [options.type]
   * @param {boolean} [options.alias]
   * @param {boolean} [options.loader]
   */
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  /**
   * @param {WebpackCompiler} compiler
   */
  apply(compiler) {
    const {
      alias,
      loader
    } = this.options;

    let {
      type
    } = this.options;

    // use default, allow zero-config setup
    if (!type) {
      type = DEFAULT_TYPE;
    }

    const configPath = CONFIG_PATHS[type];

    if (!configPath) {
      throw new Error('unknown type <' + type + '>');
    }

    const config = require(configPath)();

    // merge config
    compiler.hooks.afterEnvironment.tap('CamundaModelerWebpackPlugin', () => {

      // babel loader
      if (loader) {
        compiler.options.module.rules.push(...config.module.rules);
      }

      // alias
      if (alias) {
        compiler.options.resolve.alias = {
          ...compiler.options.resolve.alias,
          ...config.resolve.alias
        };
      }
    });
  }
}

module.exports = CamundaModelerWebpackPlugin;
