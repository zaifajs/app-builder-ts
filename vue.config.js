module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
		? '/app-builder-ts/'
		: '/',
	css: {
		loaderOptions: {
			sass: {
				sassOptions: {
					silenceDeprecations: ['legacy-js-api']
				}
			}
		}
	},
	chainWebpack: config => {
		config.plugins.delete('fork-ts-checker')
	}
}

