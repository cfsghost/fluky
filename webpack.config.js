var configs = module.exports = {
	entry: {
		app: [
			'./src/fluky.js'
		]
	},
	output: {
		path: __dirname + '/lib',
		publicPath: '/lib',
		filename: 'fluky.js'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/,
				query: {
					stage: 0,
					optional: [ 'runtime' ]
				}
			},
		]
	}
};
