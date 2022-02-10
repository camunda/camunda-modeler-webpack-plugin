import { compile } from '../compiler';

import { expect } from 'chai';

import { ClientExtensionWebpackPlugin } from '../../src';


describe('<ClientExtensionWebpackPlugin>', function() {

  this.timeout(5000);


  it('should compile', async function() {

    // given
    const entry = './fixtures/client-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new ClientExtensionWebpackPlugin()
    ]);

    // then
    expect(stats.compilation.errors).to.be.empty;
  });

});