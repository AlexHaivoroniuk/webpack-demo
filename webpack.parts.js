const { WebpackPluginServe } = require('webpack-plugin-serve');
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const glob = require("glob");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

const ALL_FILES = glob.sync(path.join(__dirname, 'src/*.js'));
console.log(ALL_FILES);

exports.devServer = () => ({
	watch: true,
	plugins: [
		new WebpackPluginServe({
			port: process.env.PORT || 8080,
			static: './dist',
			liveReload: true,
			waitForBuild: true
		})
	]
});

exports.page = ({ title }) => ({
	plugins: [
		new MiniHtmlWebpackPlugin({
			context: {
				title
			}
		})
	]
});

exports.extractCSS = ({ options = {}, loaders = []} = {}) => ({
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					...loaders,
					{ loader: MiniCssExtractPlugin.loader, options },
					'css-loader'
				],
				sideEffects: true
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	]
})

exports.tailwind = () => ({
	loader: "postcss-loader",
	options: {
		postcssOptions: {
			plugins: [require("tailwindcss")()],
		},
	},
});

exports.eliminateUnusedCSS = () => ({
	plugins: [
		new PurgeCSSPlugin({
			paths: ALL_FILES,
			extractors: [
				{
					extractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
					extensions: ['html']
				}
			]
		})
	]
})