module.exports = options => {
    return {
      entry: './react/index.js',
      output: {
        path: __dirname + '/site/',
        filename: 'bundle.js',
      },
    }
  }