import { compile, findAlias, findRule } from '../compiler';

import { expect } from 'chai';

import { ClientExtensionWebpackPlugin } from '../../src';


describe('<ClientExtensionWebpackPlugin>', function() {

  this.timeout(5000);


  it('should compile without errors', async function() {

    // given
    const entry = './fixtures/client-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new ClientExtensionWebpackPlugin()
    ]);

    // then
    expect(stats.compilation.errors).to.be.empty;
  });


  it('should set rules', async function() {

    // given
    const entry = './fixtures/client-extension/index.js';

    // when
    const { config } = await compile(entry, [
      new ClientExtensionWebpackPlugin()
    ]);

    // then
    expect(
      findRule(config.module.rules, 'camunda-modeler-webpack-plugins/node_modules/babel-loader')
    ).to.exist;
  });


  it('should set alias', async function() {

    // given
    const entry = './fixtures/client-extension/index.js';

    // when
    const { config } = await compile(entry, [
      new ClientExtensionWebpackPlugin()
    ]);

    // then
    expect(
      findAlias(config.resolve.alias, [ 'react', 'camunda-modeler-plugin-helpers/react' ])
    ).to.exist;
  });

});