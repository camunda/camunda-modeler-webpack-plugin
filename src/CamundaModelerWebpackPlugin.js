const { relative } = require('path');

const CARBON_REQUEST = /^(@carbon\/|camunda-modeler-plugin-helpers\/vendor\/@carbon\/)/;

const NODE_MODULES = /[\\/]node_modules[\\/]/;

// shared by all plugin instances, so every Carbon import is reported once per compilation
const reportedCarbonImports = new WeakMap();

const defaultOptions = {
  type: '',
  propertiesPanelAlias: true,
  propertiesPanelLoader: true,
  reactAlias: true,
  reactLoader: true,
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
  }
];


class CamundaModelerWebpackPlugin {

  /**
   * Webpack plugin to easily configure Camunda Modeler extensions.
   *
   * @param {Object} [options]
   * @param {('propertiesPanel'|'react')} [options.type]
   * @param {boolean} [options.propertiesPanelAlias]
   * @param {boolean} [options.propertiesPanelLoader]
   * @param {boolean} [options.reactAlias]
   * @param {boolean} [options.reactLoader]
   * @param {import('webpack').Configuration['devtool']} [options.devtool]
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

    compiler.hooks.thisCompilation.tap('CamundaModelerWebpackPlugin', (compilation, { normalModuleFactory }) => {
      if (!reportedCarbonImports.has(compilation)) {
        reportedCarbonImports.set(compilation, new Set());
      }

      const reported = reportedCarbonImports.get(compilation);

      normalModuleFactory.hooks.beforeResolve.tap('CamundaModelerWebpackPlugin', ({ request, contextInfo }) => {
        const issuer = contextInfo.issuer;

        if (!CARBON_REQUEST.test(request) || !issuer || NODE_MODULES.test(issuer)) {
          return;
        }

        const key = `${ issuer }:${ request }`;

        if (reported.has(key)) {
          return;
        }

        reported.add(key);

        compilation.warnings.push(new compiler.webpack.WebpackError(
          `${ relative(compiler.context, issuer) } imports <${ request }>: ` +
          'Camunda Modeler does not provide Carbon to plug-ins, use `camunda-modeler-plugin-helpers/components` ' +
          'or the Camunda Design System (https://github.com/camunda/design-system) instead'
        ));
      });
    });
  }
}

module.exports = CamundaModelerWebpackPlugin;


// helper //////////////

function findConfig(key, configs) {
  return configs.find(config => config.key === key);
}