const path = require('path');
const webpack = require('webpack');

module.exports = (env, options) => {
    return {
        entry: './src/index.js',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'readonlygridformio.js',
        },
        externals: {
            lodash: "_",
            formiojs: "Formio"
        },
        module: {
            rules: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                }
              },
            ]
          }
    }
};