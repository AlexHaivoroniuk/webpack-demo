const { mode } = require('webpack-nano/argv');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

const commonConfig = merge([
	{
		entry: ['./src']
	},
	parts.page({ title: 'Webpack Demo' })
]);

const cssLoaders = [parts.tailwind()];

const productionConfig = merge([
	parts.extractCSS({ loaders: cssLoaders }),
	parts.eliminateUnusedCSS()
]);

const developmentConfig = merge([
	{
		entry: ['webpack-plugin-serve/client']
	},
	parts.devServer(),
	parts.extractCSS({ options: { hmr: true }, loaders: cssLoaders }),
]);

const getConfig = (mode) => {
	switch (mode) {
		case 'production':
			return merge(commonConfig, productionConfig, { mode })
		case 'development':
			return merge(commonConfig, developmentConfig, { mode });
		default:
			throw new Error(`Trying to use unknown mode ${mode}`)
	}
}

module.exports = getConfig(mode);