const defaultOptions = {
  alias: true,
  loader: true
};

const CONFIG_PATH = './config/properties-panel.config';

class PropertiesPanelWebpackPlugin {
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
      if (this.options.loader) {
        compiler.options.module.rules.push(...config.module.rules);
      }

      // alias
      if (this.options.alias) {
        compiler.options.resolve.alias = {
          ...compiler.options.resolve.alias,
          ...config.resolve.alias
        };
      }
    });
  }
}

module.exports = PropertiesPanelWebpackPlugin;
