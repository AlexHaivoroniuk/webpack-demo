const { mode } = require('webpack-nano/argv');
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
	watch: mode === 'development',
	entry: ['./src', 'webpack-plugin-serve/client'],
	mode,
	plugins: [
		new MiniHtmlWebpackPlugin({
			context: {
				title: 'Webpack demo'
			}
		}),
		new WebpackPluginServe({
			port: process.env.PORT || 8080,
			static: './dist',
			liveReload: true,
			waitForBuild: true
		}),
		new WebpackNotifierPlugin()
	]
}