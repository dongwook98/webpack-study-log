// 빌드와 번들링
// 번들링: 단순하게 여러 개의 소스 코드들 -> 1개의 파일로 결합하는 과정
// 빌드 : 개발자가 작성한 코드들 웹 서버(인터넷)에 실행 가능한 형태로 제공하는 거

// npm install -D webpack webpack-cli 웹팩, 웹팩 명렁어 설치 (같이 깔아줘야함)
// 웹팩 : 자바스크립트로 된 모듈만 번들링을 하는 친구
// JSX나 TypeScript 같이 JS를 확장한 문법은 혼자서 변환x (바벨이란 친구로 웹팩이 변환할 수 있도록 도와줘야함)

// 바벨 설치
// npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
// babel-loader: 웹팩에서 사용되는 로더 중 하나 (ES6 문법으로 작성된 코드를 ES5문법으로 변환시켜주는 로더)
// @babel/core: 바벨을 이용해서 코드를 변환하는 데에 필요한 기능들을 제공하는 중추 같은 친구(필수적으로 깔아야 되는) => 트랜스파일러: 같은 언어지만 문법적으로 변환해주는 도구(컴파일러랑 좀 다름)
// @babel/preset-env: 바벨의 프리셋 중 하나 최신 (특정한 변환 규칙들을 모아놓은 거)
// @babel/preset-react: jsx -> js 변환하는 플러그인들의 모음

const path = require('path');

// 플러그인은 위에서 따로 require로 불러와야함
// 로더는 일반적으로 모듈 번들링의 일부로 사용되는 친구들 => 따로 불러오지 않아도 웹팩 친구가 자동적으로 인식을 하고 자기가 알아서 로딩하고 적용도 함

// 플러그인은 빌드하는 프로세스에 추가적으로 기능을 제공해주는 친구 (추가적으로 개발자가 설정하는 거라서 웹팩이 인식할 수 있게 requiref로 넣어줘야 한다)
// npm install -D html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// npm install -D css-loader style-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// npm install -D webpack-bundle-analyzer
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 파일을 번들하면 크기가 어느정도인지 그림으로 보여줌

module.exports = {
  entry: './src/index.js',
  devServer: {
    //  npm install --save-dev webpack-dev-server
    static: './docs',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[hash].js', // [name]: 웹팩이 알아서 지정해줌, [hash]: 해쉬값으로 지정해줌 (코드변경x =>해쉬값변경x)
    clean: true, // 전에 빌드했던걸 알아서 청소해줌
  },
  module: {
    rules: [
      // js
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
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      // css
      // npm install -D css-loader style-loader
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  // html
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin(), // 파일 별도처리 main.css
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()], // 최적화
    runtimeChunk: 'single',
  },
  // 모드 : none / development / production
  // mode 설정안하면 기본적으로 production으로 빌드해줌 (mode선택하라고 warning뜸)
  // production 모드 => 난독화o, 미니파이o, 어글리파이o
  // none 모드 => 코드정렬잘되있음 (최적화x, 난독화x)
  // development 모드 => (살짝 최적화, 살짝 난독화)
  mode: 'production',
};

// npm install react@17 react-dom@17 (17버전으로 다운그레이드)
// npm install react-hot-loader (17버전까지만 지원)
