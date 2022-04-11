import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

import { expect } from 'chai';


export function compiler(entry, plugins) {
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
    ]
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {

      if (stats.hasErrors()) {
        err = err || new Error('bundle build error');
      }

      if (err) {
        err.stats = stats;
        console.log(err.stats.compilation.errors);

        return reject(err);
      }

      resolve(stats);
    });
  });
}

export async function compile(fixture, plugins) {
  const stats = await compiler(fixture, plugins);

  const config = stats.compilation.options;

  const module = stats.toJson({ source: true }).modules.find(m => m.id === fixture);

  expect(module).to.exist;

  return {
    stats,
    module,
    code: module.source,
    config
  };
}

export function printCompileErrors(error) {
  if (error && error.stats) {
    console.log(error.stats.compilation.errors);
  }
}

export function findRule(rules, pattern) {
  return rules.find(rule => {
    return rule.use.loader.match(pattern);
  });
}

export function findAlias(alias, expected) {
  return Object.entries(alias || {}).find(a => {
    return JSON.stringify(a) === JSON.stringify(expected);
  });
}