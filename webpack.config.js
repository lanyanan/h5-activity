var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./src/env/' + process.env.NODE_ENV);
var plugins = [
	new webpack.BannerPlugin('This file is created by xieqing'),//添加代码声明注释
	new webpack.ProvidePlugin({ 
		// config: config,
		$: 'jquery'
	}),//加载jq(调用模块的别名)
	//定义全局变量到入口文件
    new webpack.DefinePlugin({
        config: JSON.stringify(config)
    }),
	// new webpack.optimize.CommonsChunkPlugin({
	// 	name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
	// 	chunks: ['index','list','details'], //提取哪些模块共有的部分
	// 	minChunks: 3 // 提取至少3个模块共有的部分
	// }),
	new ExtractTextPlugin('css/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
	new webpack.HotModuleReplacementPlugin() //热加载
];
//生产环境压缩代码
if(config.env == 'release'){
	plugins.push(	
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		})
	)
}
//HtmlWebpackPlugin生成页面配置
var entrys_dir = ['answer', 'test', 'content', 'vote', 'chuqiao', 'single-dog', 'voice-card', 'view-fate', 'Confidante', 'Halloween', 'Extension', 'PoorImagination', 'pick-up'];
var entry = {};
for(let x in entrys_dir){
	entry[entrys_dir[x]] = './src/app/' + entrys_dir[x] + '/index.js';
	var HtmlPlugin = { 
		// favicon: './favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
		filename: 'html/' + entrys_dir[x] + '.html', //生成的html存放路径，相对于path
		template: './src/app/' + entrys_dir[x] + '/index.html', //html模板路径
		inject: 'body', //js插入的位置，true/'head'/'body'/false
		hash: true, //为静态资源生成hash值
		chunks: [entrys_dir[x]],//需要引入的chunk，不配置就会引入所有页面的资源
		// minify: { //压缩HTML文件	
		// 	removeComments: true, //移除HTML中的注释
		// 	collapseWhitespace: false //删除空白符与换行符
		// }
	};
	plugins.push(new HtmlWebpackPlugin(HtmlPlugin));
}


module.exports = {
	entry: entry,
	output: { 
		path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
		publicPath: config.baseJs + '/dist/',				//模板、样式、脚本、图片等资源对应的server上的路径
		filename: 'js/[name].js',			//每个页面对应的主js的生成配置
		chunkFilename: 'js/[id].chunk.js'   //定义异步加载文件名字,chunk生成的配置
	},
	module: {
		loaders: [ //加载器，关于各个加载器的参数配置，可自行搜索之。
			{
             	test: /\.js$/,
             	exclude: /node_modules/,
             	loader: 'babel-loader'
         	},
         	{
		        test: /\.vue$/,
		        exclude: /node_modules/,
		        loader: 'vue-loader',
		        options: {
		        	transformToRequire: {"audio": "src"}//vue-loader配置参数
		        }
	      	},
			{
				test: /\.css$/,
				//配置css的抽取器、加载器。'-loader'可以省去
				loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}) 
			}, 
			{
				test: /\.less$/,
				//配置less的抽取器、加载器。中间!有必要解释一下，
				//根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
				//你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
				loader: ExtractTextPlugin.extract('css!less')
			}, 
			{
				//html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
				//比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
				test: /\.html$/,
				loader: "html-loader?attrs=img:src img:data-src"
			}, 
			{
				//文件加载器加载字体
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=./fonts/[name].[ext]'
			},
			{
				//文件加载器加载媒体文件
				test: /\.mp3(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: './media/[name].[hash:7].[ext]'
				}
			},
			{
				//图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
				//如下配置，将小于8192byte的图片转成base64码
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
			}
		],
	},
	resolve: {
		extensions: ['.js','.css','.vue'],//自动识别补全文件后缀
	  	alias: {
		    vue: 'vue/dist/vue.js'
	  	}
	},//resolve里面有一个alias的配置项目，能够让开发者指定一些模块的引用路径
	plugins: plugins,
	devtool:'source-map',
	devServer: {
		contentBase: './',
		host: config.host_name,
		port: config.host_port,
		inline: true
	}

};