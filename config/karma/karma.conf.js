let webpack = require("webpack");


module.exports = function(config) {
	config.set({
		browsers: ["PhantomJS"],
		singleRun: true, // should the browser auto-close after testing
		frameworks: ["mocha"], // what testing frameworks will we be using
		files: ["tests.webpack.js"], // files to open in browser; testing entry point
		preprocessors: {
			"tests.webpack.js": ["webpack", "sourcemap"]
		},
		reporters: ["dots", "coverage"],
		webpack: Object.assign({}, require("../../webpack.config.js"), { entry: null, output: null }),
		coverageReporter: {
			dir: "../../coverage/",
			reporters: [{
				type: "html",
				subdir: "html"
			}]
		},
		captureTimeout: 10 * 1000
	})
}