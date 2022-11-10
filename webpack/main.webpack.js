module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  },
}
