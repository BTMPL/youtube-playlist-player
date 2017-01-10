var webpack = require("webpack");

module.exports = {
	devtool: 'source-map',
	entry: ['./src/index.js'],
	output: {
		path: './dist',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: "dist/"
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
			}
		}),
		new webpack.IgnorePlugin(/react\/addons/),
    new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
    new webpack.IgnorePlugin(/react\/lib\/ExecutionEnvironment/)
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader"
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader?modules"
			},
			{
				test: /\.less$/,
				loader: "style-loader!css-loader?modules!less-loader"
			}
		]
	}
};
