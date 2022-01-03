const { override } = require('customize-cra')

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const addReactRefreshPlugin = config => {
    config.plugins.push(new ReactRefreshWebpackPlugin());
    return config;
}
  
module.exports = override(
    addReactRefreshPlugin
)