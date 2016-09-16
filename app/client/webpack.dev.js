var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var NpmInstallPlugin = require('npm-install-webpack-plugin')
var assetsPath = path.resolve(__dirname, 'dist/')

var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
]

module.exports = {

	devtool: 'cheap-module-eval-source-map',

	entry: {
		main: [
			path.resolve(__dirname, 'src/main.js'),
			'webpack-hot-middleware/client?path=/dist/__webpack_hmr&timeout=20000',
		]
	},

	output: {
		path: assetsPath,
		filename: '[name].js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/dist/'
	},

	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
			//{test: /\.css$/, exclude: /node_modules/,  loader:'isomorphic-style-loader'},
			// { test: /\.css$/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!postcss-loader'},
			// { test: /\.css$/, include: /node_modules/, loader: 'style!css!postcss-loader'},
			{ test: /\.css$/, loader: 'style!css'}
		]
	},

	postcss: [
		require('postcss-nested')(),
		require('autoprefixer')(AUTOPREFIXER_BROWSERS)
	],

	resolve: {
		modulesDirectories: [
			'server',
			'node_modules'
		],
		extensions: ['', '.js', '.jsx', '.json']
	},

	plugins: [

		// hot reload
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.WatchIgnorePlugin([/\.json$/]),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin('_vendor', 'vendor.js'),
		new NpmInstallPlugin({
			save: true,
			saveExact: true,
		}),
		new webpack.DefinePlugin({
			"process.env": {
				IS_SEREVER: true
			}
		})
	]

}
