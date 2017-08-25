import pxtorem from 'postcss-pxtorem';
const path = require( 'path' );


export default {
  entry : "src/index.js" ,
  disableCSSModules : true ,
  publicPath : "/" ,
  theme : "./theme.config.js" ,
  autoprefixer : {
    browsers : [
      "iOS >= 8" ,
      "Android >= 4"
    ]
  } ,
  extraPostCSSPlugins : [
    pxtorem( {
      rootValue : 100 ,
      propWhiteList : [] ,
    } ) ,
  ] ,
  // style 必须是 true
  extraBabelPlugins : [
    "transform-runtime" ,
    [
      "import" ,
      { libraryName : "antd-mobile" , "libraryDirectory" : "lib" , "style" : true }
    ]
  ] ,
  env : {
    development : {
      extraBabelPlugins : [
        "dva-hmr"
      ]
    }
  }
};
