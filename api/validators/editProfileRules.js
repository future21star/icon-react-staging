export default  {
	'name': {
		notEmpty: true,
		errorMessage: 'Full name is required'
	},
	'email': {
		notEmpty: true,
		errorMessage: 'Email address is required',
		isEmail: {
			errorMessage: 'Invalid email address'
		},
	},
	'gender': {
		notEmpty: true,
		errorMessage: 'Gender is required'
	},
	'heightFt': {
		notEmpty: true,
		errorMessage: 'Height (Ft) is required'
	},
	'heightIn': {
		notEmpty: true,
		errorMessage: 'Height (In) is required'
	},
	'weight': {
		notEmpty: true,
		errorMessage: 'Weight is required'
	}
}
