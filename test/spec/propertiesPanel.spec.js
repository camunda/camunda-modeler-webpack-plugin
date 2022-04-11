import { compile, findAlias, findRule } from '../compiler';

import { expect } from 'chai';

import CamundaModelerWebpackPlugin from '../../src';


describe('<type = propertiesPanel>', function() {

  this.timeout(5000);


  it('should compile without errors', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { stats } = await bootstrap(entry);

    // then
    expect(stats.compilation.errors).to.be.empty;
  });


  it('should set rules', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { config } = await bootstrap(entry);

    // then
    expect(
      findRule(config.module.rules, 'camunda-modeler-webpack-plugin/node_modules/babel-loader')
    ).to.exist;
  });


  it('should set alias', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { config } = await bootstrap(entry);

    // then
    expect(
      findAlias(config.resolve.alias, [ '@bpmn-io/properties-panel', 'camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel' ])
    ).to.exist;

    expect(
      findAlias(config.resolve.alias, [ 'bpmn-js-properties-panel', 'camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel' ])
    ).to.exist;
  });


  describe('configuration', function() {

    it('should NOT set rules', async function() {

      // given
      const entry = './fixtures/noop-extension/index.js';

      // when
      const { config } = await bootstrap(entry, {
        loader: false
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
        alias: false
      });

      // then
      expect(
        findAlias(config.resolve.alias, [ '@bpmn-io/properties-panel', 'camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel' ])
      ).not.to.exist;

      expect(
        findAlias(config.resolve.alias, [ 'bpmn-js-properties-panel', 'camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel' ])
      ).not.to.exist;
    });

  });

});


// helper //////////////

async function bootstrap(entry, options = {}) {
  return await compile(entry, [
    new CamundaModelerWebpackPlugin({
      type: 'propertiesPanel',
      ...options
    })
  ]);
}