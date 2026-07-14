/**
 * @typedef { false
 *   | 'eval'
 *   | 'eval-cheap-source-map'
 *   | 'eval-cheap-module-source-map'
 *   | 'eval-source-map'
 *   | 'eval-nosources-source-map'
 *   | 'eval-nosources-cheap-source-map'
 *   | 'eval-nosources-cheap-module-source-map'
 *   | 'cheap-source-map'
 *   | 'cheap-module-source-map'
 *   | 'cheap-nosources-source-map'
 *   | 'cheap-nosources-module-source-map'
 *   | 'inline-cheap-source-map'
 *   | 'inline-cheap-module-source-map'
 *   | 'inline-source-map'
 *   | 'inline-nosources-source-map'
 *   | 'inline-nosources-cheap-source-map'
 *   | 'inline-nosources-cheap-module-source-map'
 *   | 'hidden-source-map'
 *   | 'hidden-nosources-source-map'
 *   | 'hidden-nosources-cheap-source-map'
 *   | 'hidden-nosources-cheap-module-source-map'
 *   | 'hidden-cheap-source-map'
 *   | 'hidden-cheap-module-source-map'
 *   | 'source-map'
 * } DevTool
 */

const defaultOptions = {
  type: '',
  propertiesPanelAlias: true,
  propertiesPanelLoader: true,
  reactAlias: true,
  reactLoader: true,
  carbonReactAlias: true,
  carbonReactLoader: true,
  devtool: 'cheap-module-source-map'
};

const CONFIGURATIONS = [
  {
    key: 'propertiesPanel',
    path: './config/propertiesPanel.config.js',
    aliasFlag: 'propertiesPanelAlias',
    loaderFlag: 'propertiesPanelLoader'
  },
  {
    key: 'react',
    path: './config/react.config.js',
    aliasFlag: 'reactAlias',
    loaderFlag: 'reactLoader'
  },
  {
    key: 'carbonReact',
    path: './config/carbon-react.config.js',
    aliasFlag: 'carbonReactAlias',
    loaderFlag: 'carbonReactLoader'
  },
];


class CamundaModelerWebpackPlugin {

  /**
   * Webpack plugin to easily configure Camunda Modeler extensions.
   *
   * @param {Object} [options]
   * @param {('propertiesPanel'|'react'|'carbonReact')} [options.type]
   * @param {boolean} [options.propertiesPanelAlias]
   * @param {boolean} [options.propertiesPanelLoader]
   * @param {boolean} [options.reactAlias]
   * @param {boolean} [options.reactLoader]
   * @param {boolean} [options.carbonReactAlias]
   * @param {boolean} [options.carbonReactLoader]
   * @param {DevTool} [options.devtool]
   */
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  /**
   * @param {import('webpack').Compiler} compiler
   */
  apply(compiler) {
    const options = this.options;

    const {
      type,
      devtool
    } = options;

    let configs = [];

    // set all as default, allow zero-config setup
    if (!type) {
      configs = CONFIGURATIONS;
    } else {
      const config = findConfig(type, CONFIGURATIONS);

      if (!config) {
        throw new Error('unknown type <' + type + '>');
      }

      configs.push(config);
    }

    // merge configs
    compiler.hooks.afterEnvironment.tap('CamundaModelerWebpackPlugin', () => {

      // set best-practice devtool for source maps
      if (devtool !== undefined) {
        compiler.options.devtool = devtool;
      }

      configs.forEach((config) => {
        const {
          path,
          aliasFlag,
          loaderFlag
        } = config;

        const alias = options[aliasFlag];
        const loader = options[loaderFlag];

        const webpackConfig = require(path)();

        // append (babel) loader
        if (loader) {
          compiler.options.module.rules.push(...webpackConfig.module.rules);
        }

        // append alias
        if (alias) {
          compiler.options.resolve.alias = {
            ...compiler.options.resolve.alias,
            ...webpackConfig.resolve.alias
          };
        }
      });
    });
  }
}

module.exports = CamundaModelerWebpackPlugin;


// helper //////////////

function findConfig(key, configs) {
  return configs.find(config => config.key === key);
}