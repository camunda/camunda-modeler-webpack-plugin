import {
  compile as webpackCompile,
  configuredBabelLoader,
  configuredCarbonReactAlias,
  expectNoErrors
} from '../compiler.mjs';

import { expect } from 'chai';

import CamundaModelerWebpackPlugin from '../../src/index.js';


describe('<type = carbon-react>', function() {

  this.timeout(5000);


  it('should work with zero-config', async function() {

    // when
    const { stats } = await compile('./fixtures/carbon-client-extension/index.js', [
      new CamundaModelerWebpackPlugin()
    ]);

    // then
    expectNoErrors(stats);
  });


  it('should compile without errors', async function() {

    // given
    const entry = './fixtures/carbon-client-extension/index.js';

    // when
    const { stats } = await compile(entry);

    // then
    expectNoErrors(stats);
  });


  it('should set rules', async function() {

    // given
    const entry = './fixtures/carbon-client-extension/index.js';

    // when
    const { stats } = await compile(entry);

    // then
    expect(configuredBabelLoader(stats)).to.exist;
  });


  it('should set alias', async function() {

    // given
    const entry = './fixtures/carbon-client-extension/index.js';

    // when
    const { stats } = await compile(entry);

    // then
    expect(configuredCarbonReactAlias(stats)).to.exist;
  });


  it('should replace references', async function() {

    // given
    const entry = './fixtures/carbon-client-extension/client/index.js';

    // when
    const {
      stats,
      output
    } = await compile(entry);

    // then
    expectNoErrors(stats);

    expect(output).not.to.include("import React, { Fragment, Component } from 'react'");
    expect(output).to.include('"../node_modules/camunda-modeler-plugin-helpers/vendor/@carbon/react.js"');
  });


  describe('configuration', function() {

    it('should NOT set rules', async function() {

      // given
      const entry = './fixtures/noop-extension/index.js';

      // when
      const { stats } = await compile(entry, {
        carbonReactLoader: false,
        reactLoader: false
      });

      // then
      expect(configuredBabelLoader(stats)).not.to.exist;
    });


    it('should NOT set alias', async function() {

      // given
      const entry = './fixtures/noop-extension/index.js';

      // when
      const { stats } = await compile(entry, {
        carbonReactAlias: false
      });

      // then
      expect(configuredCarbonReactAlias(stats)).not.to.exist;
    });

  });

});


// helper //////////////

function compile(entry, options = {}) {
  return webpackCompile(entry, [
    new CamundaModelerWebpackPlugin({
      type: 'react',
      ...options
    }),
    new CamundaModelerWebpackPlugin({
      type: 'carbonReact',
      ...options
    })
  ]);
}