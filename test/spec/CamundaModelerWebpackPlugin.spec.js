import { compile } from '../compiler';

import { expect } from 'chai';

import CamundaModelerWebpackPlugin from '../../src';


describe('<CamundaModelerWebpackPlugin>', function() {

  this.timeout(5000);


  it('should use default type', async function() {

    // given
    const entry = './fixtures/noop-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new CamundaModelerWebpackPlugin()
    ]);

    // then
    expect(stats.compilation.errors).to.be.empty;
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
