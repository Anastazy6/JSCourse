// Only for testing purposes

module.exports = {  
  mode: 'development',  
  entry: './course/static/scripts/index.js',  
  output: {  
    filename: 'main.js',  
    publicPath: './course/dist/scripts'  
  },
  module: {  
    rules: [  
      {  
        test: /\.js$/,  
        exclude: /node_modules/,  
        use: {  
          loader: 'babel-loader',  
          options: {  
            presets: ['@babel/preset-env']  
          }  
        }  
      }  
    ]  
  } 
};