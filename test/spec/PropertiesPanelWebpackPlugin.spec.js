import { compile } from '../compiler';

import { expect } from 'chai';

import { PropertiesPanelWebpackPlugin } from '../../src';


describe('<PropertiesPanelWebpackPlugin>', function() {

  it('should compile', async function() {

    // given
    const entry = './fixtures/properties-panel-extension/index.js';

    // when
    const { stats } = await compile(entry, [
      new PropertiesPanelWebpackPlugin()
    ]);

    // then
    expect(stats.compilation.errors).to.be.empty;
  });

});