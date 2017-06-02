const sendGridConfig = {
	development: {
		auth: {
			api_key: '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'
		}
	},
	production: {
		// TODO: enter production key
		auth: {
			api_key: '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'
		}
	}
};

let env = 'production';

if (process.env.NODE_ENV !== 'production') {
	env = 'development';
}

export default sendGridConfig[env];

