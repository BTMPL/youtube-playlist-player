let webpack = require("webpack");


module.exports = function(config) {
	config.set({
		browsers: ["PhantomJS", "Chrome"],
		singleRun: true, // should the browser auto-close after testing
		frameworks: ["mocha"], // what testing frameworks will we be using
		files: ["tests.webpack.js"], // files to open in browser; testing entry point
		preprocessors: {
			"tests.webpack.js": ["webpack"]
		},
		reporters: ["dots"],
		webpack: require("../../webpack.config.js")		
	})
}