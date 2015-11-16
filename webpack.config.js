var configs = module.exports = {
	entry: {
		app: [
			'./src/fluky.js'
		]
	},
	output: {
		libraryTarget: 'commonjs2',
		path: __dirname + '/lib',
		publicPath: '/lib',
		filename: 'fluky.js'
	},
	target: 'node',
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
