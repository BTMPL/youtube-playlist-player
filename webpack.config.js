module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: './dist',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: "dist/"
	},
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
			}
		]
	}
};
