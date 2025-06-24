import {
  compile as webpackCompile,
  configuredBabelLoader,
  configuredBpmnJSPropertiesPanelAlias,
  configuredPropertiesPanelAlias,
  expectNoErrors
} from '../compiler.mjs';

import { expect } from 'chai';

import CamundaModelerWebpackPlugin from '../../src/index.js';


describe('<type = propertiesPanel>', function() {

  this.timeout(5000);


  it('should work with zero-config', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const {
      stats
    } = await compile(entry, [
      new CamundaModelerWebpackPlugin()
    ]);

    // then
    expectNoErrors(stats);
  });


  it('should compile without errors', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { stats } = await compile(entry);

    // then
    expectNoErrors(stats);
  });


  it('should set rules', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { stats } = await compile(entry);

    // then
    expect(configuredBabelLoader(stats)).to.exist;
  });


  it('should set alias', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { stats } = await compile(entry);

    // then
    expect(configuredPropertiesPanelAlias(stats)).to.exist;
    expect(configuredBpmnJSPropertiesPanelAlias(stats)).to.exist;
  });


  it('should replace references', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/provider/index.js';

    // when
    const {
      stats,
      output
    } = await compile(entry);

    // then
    expectNoErrors(stats);

    expect(output).not.to.include("'bpmn-js-properties-panel'");
    expect(output).to.include('"../node_modules/camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel.js"');

    expect(output).not.to.include("'@bpmn-io/properties-panel'");
    expect(output).to.include('"../node_modules/camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel/index.js"');
  });


  describe('configuration', function() {

    it('should NOT set rules', async function() {

      // given
      const entry = './fixtures/noop-extension/index.js';

      // when
      const { stats } = await compile(entry, {
        propertiesPanelLoader: false
      });

      // then
      expect(configuredBabelLoader(stats)).not.to.exist;
    });


    it('should NOT set alias', async function() {

      // given
      const entry = './fixtures/noop-extension/index.js';

      // when
      const { stats } = await compile(entry, {
        propertiesPanelAlias: false
      });

      // then
      expect(configuredPropertiesPanelAlias(stats)).not.to.exist;
      expect(configuredBpmnJSPropertiesPanelAlias(stats)).not.to.exist;
    });

  });

});


// helper //////////////

function compile(entry, options = {}) {
  return webpackCompile(entry, [
    new CamundaModelerWebpackPlugin({
      type: 'propertiesPanel',
      ...options
    })
  ]);
}