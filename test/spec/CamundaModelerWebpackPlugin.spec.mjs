import {
  compile,
  configuredPropertiesPanelAlias,
  configuredReactAlias,
  expectNoErrors
} from '../compiler.mjs';

import { expect } from 'chai';

import CamundaModelerWebpackPlugin from '../../src/index.js';


describe('<CamundaModelerWebpackPlugin>', function() {

  this.timeout(5000);


  it('should work with zero config', async function() {

    // given
    const entry = './fixtures/noop-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new CamundaModelerWebpackPlugin()
    ]);

    // then
    expectNoErrors(stats);
  });


  it('should NOT append other types config', async function() {

    // given
    const entry = './fixtures/noop-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new CamundaModelerWebpackPlugin({
        type: 'react'
      })
    ]);

    // then
    expect(configuredReactAlias(stats)).to.exist;
    expect(configuredPropertiesPanelAlias(stats)).not.to.exist;
  });


  it('should throw - unknown type', async function() {

    // given
    const entry = './fixtures/noop-extension/index.js';

    // when
    try {
      await compile(entry, [
        new CamundaModelerWebpackPlugin({
          type: 'foo'
        })
      ]);
    } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.eql('unknown type <foo>');

      return;
    }

    throw new Error('this should not happen');
  });


  it('should set devtool by default', async function() {

    // given
    const entry = './fixtures/noop-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new CamundaModelerWebpackPlugin()
    ]);

    // then
    expect(stats.compilation.options.devtool).to.eql('cheap-module-source-map');
  });


  it('should NOT set devtool if disabled', async function() {

    // given
    const entry = './fixtures/noop-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new CamundaModelerWebpackPlugin({
        devtool: false
      })
    ]);

    // then
    expect(stats.compilation.options.devtool).to.eql(false);
  });


  it('should set custom devtool', async function() {

    // given
    const entry = './fixtures/noop-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new CamundaModelerWebpackPlugin({
        devtool: 'source-map'
      })
    ]);

    // then
    expect(stats.compilation.options.devtool).to.eql('source-map');
  });


  it('should preserve custom rule', async function() {

    // given
    const entry = './fixtures/client-extension/index.js';

    const styleRule = {
      test: /\.css/,
      exclude: /node_modules/,
      use: {
        loader: 'style-loader'
      }
    };

    // when
    const { stats } = await compile(entry, [ new CamundaModelerWebpackPlugin({
      'type': 'react'
    }) ], [ styleRule ]);

    // then
    // style rule is preserved
    expect(stats.compilation.options.module.rules).to.include(styleRule);
  });


  it('should warn about Carbon import', async function() {

    // given
    const entry = './fixtures/carbon-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new CamundaModelerWebpackPlugin()
    ]);

    // then
    const messages = stats.compilation.warnings.map(warning => warning.message);

    expect(messages).to.eql([
      'fixtures/carbon-extension/index.js imports <@carbon/react>: ' +
      'Camunda Modeler does not provide Carbon to plug-ins, use `camunda-modeler-plugin-helpers/components` ' +
      'or the Camunda Design System (https://github.com/camunda/design-system) instead'
    ]);
  });


  it('should NOT warn without Carbon import', async function() {

    // given
    const entry = './fixtures/client-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new CamundaModelerWebpackPlugin()
    ]);

    // then
    expect(stats.compilation.warnings).to.be.empty;
  });


  it('should warn about Carbon import once with multiple plugin instances', async function() {

    // given
    const entry = './fixtures/carbon-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new CamundaModelerWebpackPlugin({ type: 'react' }),
      new CamundaModelerWebpackPlugin({ type: 'propertiesPanel' })
    ]);

    // then
    expect(stats.compilation.warnings).to.have.length(1);
  });

});
