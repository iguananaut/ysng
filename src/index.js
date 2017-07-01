module.exports = require("./generate");

require("./index.html");
require.context("../static/", false, /^.*\.(jpg|css)/);
