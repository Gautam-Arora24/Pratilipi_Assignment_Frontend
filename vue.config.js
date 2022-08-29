const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: { proxy: 'https://exampledomain.com/api/'}
});
