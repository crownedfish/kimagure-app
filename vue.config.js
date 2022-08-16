const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "木まぐれアプリ",
    }
  }
})
