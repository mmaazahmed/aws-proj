const nodeExternals=require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');




module.exports={
    target:'node',
    mode: 'none',
    externals: [nodeExternals()],
    // plugins:[
    //     new CopyPlugin({
    //         patterns: [
    //           { from: './node_modules/.prisma/client/schema.prisma', to: './' }, // you may need to change `to` here.
    //         ],
    //       }),
    // ],
    // plugins: [
    //   new CopyPlugin({ patterns: ['./node_modules/.prisma/client/schema.prisma'] }), // without this the prisma generate above will not work
    // ],
    resolve: {
        extensions: ['.js', '.json'], 
    },
    
};