/**
 * this is the "entry point" that Karma will load
 * to init the testing process 
 */

require("phantomjs-function-bind-polyfill");
require("babel-polyfill");

/**
 * this basically reads and includes all the .test.js files
 */
var context = require.context("../../src", true, /\.test\.js$/);
context.keys().forEach(context);