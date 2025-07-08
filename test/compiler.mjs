import path from 'path';
import webpack from 'webpack';

import { memfs } from 'memfs';

import { expect } from 'chai';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/**
 * @param { string } entry
 * @param { any[] } plugins
 *
 * @return { Promise<{ output: string, stats: import('webpack').Stats }> }
 */
export async function compile(entry, plugins, rules = []) {

  const {
    fs
  } = memfs();

  const compiler = webpack({
    mode: 'development',
    context: __dirname,
    entry: path.resolve(__dirname, entry),
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    plugins: [
      ...plugins
    ],
    module: {
      rules
    }
  });

  compiler.outputFileSystem = fs;

  const run = () => new Promise((resolve, reject) => {
    compiler.run((err, stats) => {

      if (err) {
        return reject(err);
      }

      resolve(stats);
    });
  });

  const stats = await run();

  const output = await fs.promises.readFile(path.resolve(__dirname, 'bundle.js'), 'utf8');

  return {
    stats,
    output
  };
}

export function expectNoErrors(stats) {
  expect(stats.compilation.errors).to.be.empty;
}

/**
 * @param { import('webpack').Stats } stats
 * @param { string } pattern
 *
 * @return { any }
 */
export function configuredRule(stats, pattern) {
  const rules = stats.compilation.options.module.rules;

  return rules.find(rule => {
    return rule.use.loader.match(pattern);
  });
}

/**
 * @param { import('webpack').Stats } stats
 * @param { any } expected
 *
 * @return { any }
 */
export function configuredAlias(stats, expected) {
  const alias = stats.compilation.options.resolve.alias;

  return Object.entries(alias || {}).find(a => {
    return JSON.stringify(a) === JSON.stringify(expected);
  });
}

const CONFIG_BABEL_LOADER = 'camunda-modeler-webpack-plugin/node_modules/babel-loader';

const CONFIG_PROPERTIES_PANEL_ALIAS = [ '@bpmn-io/properties-panel', 'camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel' ];
const CONFIG_BPMN_JS_PROPERTIES_PANEL_ALIAS = [ 'bpmn-js-properties-panel', 'camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel' ];
const CONFIG_REACT_ALIAS = [ 'react', 'camunda-modeler-plugin-helpers/vendor/react' ];
const CONFIG_CARBON_REACT_ALIAS = [ '@carbon/react', 'camunda-modeler-plugin-helpers/vendor/@carbon/react' ];


export function configuredReactAlias(stats) {
  return configuredAlias(stats, CONFIG_REACT_ALIAS);
}

export function configuredBpmnJSPropertiesPanelAlias(stats) {
  return configuredAlias(stats, CONFIG_BPMN_JS_PROPERTIES_PANEL_ALIAS);
}

export function configuredPropertiesPanelAlias(stats) {
  return configuredAlias(stats, CONFIG_PROPERTIES_PANEL_ALIAS);
}

export function configuredBabelLoader(stats) {
  return configuredRule(stats, CONFIG_BABEL_LOADER);
}

export function configuredCarbonReactAlias(stats) {
  return configuredAlias(stats, CONFIG_CARBON_REACT_ALIAS);
}