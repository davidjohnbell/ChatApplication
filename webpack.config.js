module.exports = options => {
    return {
      entry: './react/index.js',
      output: {
        path: __dirname + '/site/',
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
      },  
    }
  }