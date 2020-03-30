const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const path = require('path');
const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  entryFiles.forEach((item) => {
    const entryFile = item;
    const match = entryFile.match(/src\/(.+)\/index\.js/);
    const entryName = match && match[1];
    entry[entryName] = entryFile;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${entryName}/index.html`),
        filename: `${entryName}.html`,
        chunks: ['vendors', entryName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      }),
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(projectRoot, 'dist')
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|svg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|tff|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  stats: 'errors-only',
  plugins: [
    new CleanWebpackPlugin(),
    // 友好提示
    new FriendlyErrorsWebpackPlugin(),
    // 错误捕获
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors
                    && stats.compilation.errors.length) {
          console.log('build error');
          process.exit(1);
        }
      });
    },
    new MiniCssExtractPlugin(),
  ].concat(htmlWebpackPlugins)
  
};
