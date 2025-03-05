import { compile, findAlias, findMultipleAlias, findRule } from '../compiler';

import { expect } from 'chai';

import CamundaModelerWebpackPlugin from '../../src';

describe('<type = carbon-react>', function() {

  this.timeout(5000);


  it('should work with zero-config', async function() {

    // when
    const { stats } = await compile('./fixtures/carbon-client-extension/index.js', [
      new CamundaModelerWebpackPlugin()
    ]);

    // then
    expect(stats.compilation.errors).to.be.empty;
  });


  it('should compile without errors', async function() {

    // given
    const entry = './fixtures/carbon-client-extension/index.js';

    // when
    const { stats } = await bootstrap(entry);

    // then
    expect(stats.compilation.errors).to.be.empty;
  });


  it('should set rules', async function() {

    // given
    const entry = './fixtures/carbon-client-extension/index.js';

    // when
    const { config } = await bootstrap(entry);

    // then
    expect(
      findRule(config.module.rules, 'camunda-modeler-webpack-plugin/node_modules/babel-loader')
    ).to.exist;
  });


  it('should set alias', async function() {

    // given
    const entry = './fixtures/carbon-client-extension/index.js';

    // when
    const { config } = await bootstrap(entry);

    // then
    expect(
      findMultipleAlias(config.resolve.alias['@carbon/react'], [
        '@carbon/react', 'camunda-modeler-plugin-helpers/@carbon/react',
        '@carbon/icons-react', 'camunda-modeler-plugin-helpers/@carbon/icons-react'
      ])
    ).to.exist;
  });


  describe('configuration', function() {

    it('should NOT set rules', async function() {

      // given
      const entry = './fixtures/noop-extension/index.js';

      // when
      const { config } = await bootstrap(entry, {
        carbonReactLoader: false
      });

      // then
      expect(
        findRule(config.module.rules, 'camunda-modeler-webpack-plugin/node_modules/babel-loader')
      ).not.to.exist;
    });


    it('should NOT set alias', async function() {

      // given
      const entry = './fixtures/noop-extension/index.js';

      // when
      const { config } = await bootstrap(entry, {
        reactAlias: false
      });

      // then
      expect(
        findAlias(config.resolve.alias, [ 'react', 'camunda-modeler-plugin-helpers/react' ])
      ).not.to.exist;
    });

  });

});


// helper //////////////

async function bootstrap(entry, options = {}) {
  return await compile(entry, [
    new CamundaModelerWebpackPlugin({
      type: 'carbon-react',
      ...options
    })
  ]);
}