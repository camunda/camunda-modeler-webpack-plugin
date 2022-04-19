import { compile, findAlias } from '../compiler';

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
    expect(stats.compilation.errors).to.be.empty;
  });


  it('should NOT append other types config', async function() {

    // given
    const entry = './fixtures/noop-extension/index.js';

    // when
    const { config } = await compile(entry, [
      new CamundaModelerWebpackPlugin({
        type: 'react'
      })
    ]);

    // then
    expect(
      findAlias(config.resolve.alias, [ 'react', 'camunda-modeler-plugin-helpers/react' ])
    ).to.exist;

    expect(
      findAlias(config.resolve.alias, [ '@bpmn-io/properties-panel', 'camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel' ])
    ).not.to.exist;
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

});
