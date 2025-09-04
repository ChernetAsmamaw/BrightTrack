module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-transform-flow-strip-types'],
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-object-rest-spread'],
    ],
  };
};
