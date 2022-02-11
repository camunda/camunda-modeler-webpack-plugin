import { compile, findAlias, findRule } from '../compiler';

import { expect } from 'chai';

import { PropertiesPanelWebpackPlugin } from '../../src';


describe('<PropertiesPanelWebpackPlugin>', function() {

  it('should compile without errors', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new PropertiesPanelWebpackPlugin()
    ]);

    // then
    expect(stats.compilation.errors).to.be.empty;
  });


  it('should set rules', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { config } = await compile(entry, [
      new PropertiesPanelWebpackPlugin()
    ]);

    // then
    expect(
      findRule(config.module.rules, 'camunda-modeler-webpack-plugins/node_modules/babel-loader')
    ).to.exist;
  });


  it('should set alias', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { config } = await compile(entry, [
      new PropertiesPanelWebpackPlugin()
    ]);

    // then
    expect(
      findAlias(config.resolve.alias, [ '@bpmn-io/properties-panel', 'camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel' ])
    ).to.exist;

    expect(
      findAlias(config.resolve.alias, [ 'bpmn-js-properties-panel', 'camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel' ])
    ).to.exist;
  });

});