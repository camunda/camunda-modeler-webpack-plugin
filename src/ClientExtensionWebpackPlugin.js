const defaultOptions = {};

const CONFIG_PATH = './config/client-extension.config';

class ClientExtensionWebpackPlugin {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  /**
   * @param {WebpackCompiler} compiler
   */
  apply(compiler) {
    const config = require(CONFIG_PATH)();

    // merge config
    compiler.hooks.afterEnvironment.tap('PropertiesPanelWebpackPlugin', () => {

      // babel loader
      compiler.options.module.rules.push(...config.module.rules);

      // alias
      compiler.options.resolve.alias = {
        ...compiler.options.resolve.alias,
        ...config.resolve.alias
      };
    });
  }
}

module.exports = ClientExtensionWebpackPlugin;