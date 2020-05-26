const path = require('path');
const HtmlWebpackplugin= require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports={
    entry:['./src/js/index.js'],
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'js/bundle.js'
    },
    devServer: {
        contentBase:'./dist'
    },
    plugins:[
        new HtmlWebpackplugin({
            filename:'index.html',
            template:'./src/index.html'
        }),
        new TerserPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }
};