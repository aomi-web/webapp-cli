import * as path from 'path';
import * as webpack from 'webpack';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const { NODE_ENV = 'development' } = process.env;

const appHome = process.cwd();
const buildDir = path.join(appHome, 'build', 'dll');

const userPkg = require(path.join(appHome, 'package.json'));

export default {
  entry: userPkg.dllEntry,
  output: {
    filename: '[name].dll.js',
    path: buildDir,
    library: '_dll_[name]_[hash]'
  },
  context: appHome,
  mode: NODE_ENV,
  devtool: NODE_ENV === 'production' ? false : 'source-map',
  plugins: [
    //new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.DllPlugin({
      name: '_dll_[name]_[hash]',
      path: path.join(buildDir, '[name].manifest.json') // manifest文件的输出路径
    })
  ]
};
