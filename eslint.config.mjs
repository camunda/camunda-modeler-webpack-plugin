import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  lib: [
    'src/**/*.js'
  ],
  build : [
    '*.js',
    '*.mjs',
  ],
  test: [
    'test/spec/**/*.mjs',
  ],
  fixtures: [
    'test/fixtures/**/*.js'
  ]
};

export default [

  // lib + build
  ...bpmnIoPlugin.configs.node.map(config => {
    return {
      ...config,
      ignores: files.fixtures,
    };
  }),

  // fixtures
  ...bpmnIoPlugin.configs.browser.map(config => {
    return {
      ...config,
      files: files.fixtures
    };
  }),
  ...bpmnIoPlugin.configs.jsx.map((config) => {
    return {
      ...config,
      files: files.fixtures,
      settings: {
        react: { version: '16.14.0' }
      },
    };
  }),

  // test
  ...bpmnIoPlugin.configs.mocha.map(config => {

    return {
      ...config,
      files: files.test,
    };
  })
];