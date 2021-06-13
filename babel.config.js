module.exports = function(api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ['transform-remove-console'],
      }
    },
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.js',
            '.ios.js',
            '.android.js',
            '.ts',
            '.tsx',
            '.ios.ts',
            '.ios.tsx',
            '.android.ts',
            '.android.tsx',
          ],
          alias: {
            Components: './src/components',
            Redux: './src/redux',
            Screens: './src/screens',
            Statics: './src/statics',
            Assets: './assets',
          },
        },
      ],
    ],
  };
};
