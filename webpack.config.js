var webpack =require("webpack");

module.exports = {
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
		})
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
			/**
			 * json loader is required when using enyme
			 */			
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},
	/**
	 * we need to mock some node built-in modules to be able to
	 * run the test in browser env
	 */
	node: {
		fs: "empty",
		net: "empty",
		child_process: "empty",
		tls: "empty"
	}
};
