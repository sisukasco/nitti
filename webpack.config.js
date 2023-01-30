const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
            loader: "ts-loader",
            options: {
                configFile: path.resolve(__dirname, "tsconfig.json"),
                // https://github.com/TypeStrong/ts-loader/blob/ea2fcf925ec158d0a536d1e766adfec6567f5fb4/README.md#faster-builds
                // https://github.com/TypeStrong/ts-loader/blob/ea2fcf925ec158d0a536d1e766adfec6567f5fb4/README.md#hot-module-replacement
               // transpileOnly: true,
                allowTsInNodeModules: true,
                
            },
        }
    }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};