const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const paths = require('../paths');
const { isDevelopment, isProduction } = require('../env');
const { imageInlineSizeLimit } = require('../conf');

const getCssLoaders = (importLoaders) => [
  // CSS样式文件处理
  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDevelopment,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          require('postcss-flexbugs-fixes'),
          isProduction && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
        ].filter(Boolean),
      },
    },
  },
];

module.exports = {
  entry: {
    // 定义了入口文件路径，其属性名 app 表示引入文件的名字。
    app: paths.appIndex,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      Src: paths.appSrc,
      Components: paths.appSrcComponents,
      Utils: paths.appSrcUtils,
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    axios: 'axios',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/, // tsx、ts、js文件的处理
        loader: 'babel-loader', // 通过babel加载
        options: { cacheDirectory: true }, // 是否缓存公共文件目录
        exclude: /node_modules/, // 排除node_modules
      },
      {
        test: /\.m?js/, // https://forum.babylonjs.com/t/can-build-v4-2-but-not-v5-0-why-not/19147
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/, // css文件的处理
        use: getCssLoaders(1),
      },
      {
        test: /\.scss$/, // scss文件的处理
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/], // 图片的处理
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: imageInlineSizeLimit, // 设置行内图片最大的size限制
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/, // 字体的处理
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 将js文件自动导入到html中
      template: paths.appHtml,
      cache: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          context: paths.appPublic,
          from: '*',
          to: paths.appBuild,
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new WebpackBar({
      name: isDevelopment ? 'RUNNING' : 'BUNDLING',
      color: isDevelopment ? '#52c41a' : '#722ed1',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.appTsConfig,
      },
    }),
  ],
};
