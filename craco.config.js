const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: {
    plugins: [new NodePolyfillPlugin()],
    configure: {
      resolve: {
        fallback: {},
      },
    },
  },
};
