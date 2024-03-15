module.exports={
    target:'node',
    mode: 'none',
    module: {
        rules: [
          // Exclude HTML files from processing
          {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'ignore-loader',
          },
        ],
      },
    resolve: {
        extensions: ['.js', '.json'], 
    },
    externals: [
        'nock',
        '@types/aws-lambda',
        '@types/bcrypt-nodejs',
        '@types/express',
        '@types/jsonwebtoken',
        '@types/node',
        'node-gyp',
        'nodemon',
        'serverless-dotenv-plugin',
        'serverless-offline',
        'serverless-plugin-typescript',
        'serverless-webpack',
        'ts-node',
        'webpack'
      ],
};