import CamundaModelerWebpackPlugin from '../../src';
import { compile } from '../compiler';
import { expect } from 'chai';

describe('snapshot', function() {

  it('should modify webpack config when plugin is applied', async function() {

    // given
    const entry = './fixtures/noop-extension/index.js';

    // when
    const resultWithoutPlugin = await compile(entry,[]);
    const resultWithPlugin = await compile(entry, [ new CamundaModelerWebpackPlugin() ]);

    // then
    expect(resultWithPlugin.config.module.rules).to.exist;
    expect(resultWithPlugin.config.module.rules).to.not.equal(resultWithoutPlugin.config.module.rules);

    expect(resultWithPlugin.config.resolve.alias).to.exist;
    expect(resultWithPlugin.config.resolve.alias).to.not.equal(resultWithoutPlugin.config.resolve.alias);

    expect(resultWithPlugin.config.plugins).to.exist;
  });


  it('should throw error if used without plugin - without loader rules', async function() {

    // given
    const entry = './fixtures/client-extension/index.js';

    // then
    await expect(compile(entry, [])).to.be.throw;
  });


  it('should have alias', async function() {

    // given
    const entry = './fixtures/client-extension/index.js';

    // when
    const webpack = await compile(entry, [ new CamundaModelerWebpackPlugin({
      'type': 'react'
    }) ]);

    // then
    expect(webpack.config.resolve.alias).to.exist;

  });


  describe('custom rules', function() {

    const entry = './fixtures/client-extension/index.js';
    const customRules = [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-react' ]
          }
        }
      }
    ];

    it('should use custom rules without plugin options', async function() {

      // when
      const webpack = await compile(entry, [], customRules);

      // then
      expect(webpack.config.module.rules).to.deep.equal(customRules);
      expect(webpack.config.plugins).to.be.empty;
    });


    it('should use custom rules with plugin options', async function() {

      // when
      const webpack = await compile(entry, [ new CamundaModelerWebpackPlugin({
        'type': 'react'
      }) ], customRules);

      // then
      expect(webpack.config.module.rules).to.have.lengthOf.greaterThan(1);
      expect(webpack.config.plugins).to.not.be.empty;
    });


    it('should not have alias', async function() {

      // when
      const webpack = await compile(entry, [], customRules);

      // then
      expect(webpack.config.resolve.alias).to.not.exist;

    });
  });
});