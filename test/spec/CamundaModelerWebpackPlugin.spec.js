import {
  compile,
  configuredPropertiesPanelAlias,
  configuredReactAlias,
  expectNoErrors
} from '../compiler';

import { expect } from 'chai';

import CamundaModelerWebpackPlugin from '../../src';


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

});
