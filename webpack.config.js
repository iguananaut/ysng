const path = require('path');

module.exports = {
  entry: "./src/generate.js",
  output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      library: "YSNG"
  }
}
