const path = require('path');

// 플러그인은 위에서 따로 require로 불러와야함
// 로더는 일반적으로 모듈 번들링의 일부로 사용되는 친구들 => 따로 불러오지 않아도 웹팩 친구가 자동적으로 인식을 하고 자기가 알아서 로딩하고 적용도 함
// 플러그인은 빌드하는 프로세스에 추가적으로 기능을 제공해주는 친구 (추가적으로 개발자가 설정하는 거라서 웹팩이 인식할 수 있게 requiref로 넣어줘야 한다)
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react', { runtime: 'automatic' }], // runtime: ~~ => 빌드하는동시에
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
};
