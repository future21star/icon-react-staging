require('babel-polyfill');

const environment = {
	development: {
		isProduction: false
	},
	staging: {
		isProduction: true
	},
	production: {
		isProduction: true
	}
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
	host: process.env.HOST || 'localhost',
	port: process.env.PORT,
	apiHost: process.env.APIHOST || 'localhost',
	apiPort: process.env.APIPORT,
	app: {
		title: 'Icon Athlete Vault',
		description: 'Icon Athlete provides the tools and resources to elevate your fitness',
		head: {
			titleTemplate: '%s - Icon Athlete Vault',
			meta: [
				{name: 'description', content: 'Icon Athlete provides the tools and resources to elevate your fitness'},
				{charset: 'utf-8'},
				{property: 'og:site_name', content: 'Icon Athlete Vault'},
				{property: 'og:image', content: 'https://vault.iconathlete.com/logo.png'},
				{property: 'og:locale', content: 'en_US'},
				{property: 'og:title', content: 'Icon Athlete Vault'},
				{property: 'og:description', content: 'Icon Athlete provides the tools and resources to elevate your fitness'},
				{property: 'og:card', content: 'Icon Athlete provides the tools and resources to elevate your fitness'},
				{property: 'og:site', content: 'Icon Athlete Vault'},
				{property: 'og:creator', content: 'Icon Athlete Vault'},
				{property: 'og:image:width', content: '200'},
				{property: 'og:image:height', content: '200'}
			]
		}
	},

}, environment);
